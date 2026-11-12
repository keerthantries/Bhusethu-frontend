import express from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import {
  listProperties,
  createProperty,
  getProperty,
  updateProperty,
  deleteProperty,
  findReferencedAssets,
  findPropertyBySourceEnquiry,
  updateContact
} from '../store.js';
import { requireAuth, COOKIE_NAME } from '../middleware/auth.js';
import { parseListQuery, cleanText, cleanMultiline } from '../utils/query.js';
import { sendError } from '../utils/http.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 10 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) return cb(null, true);
    const error = new Error('Only image files are allowed');
    error.status = 400;
    cb(error);
  }
});

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'bhusethu/properties', resource_type: 'image' },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(buffer);
  });

// Uploads run one at a time so a burst of large files cannot exhaust memory.
async function uploadMany(files = []) {
  const results = [];
  try {
    for (const file of files) results.push(await uploadToCloudinary(file.buffer));
    return results;
  } catch (err) {
    await Promise.allSettled(results.map((result) => cloudinary.uploader.destroy(result.public_id)));
    throw err;
  }
}

const destroyUploads = (results = []) =>
  Promise.allSettled(results.map((result) => cloudinary.uploader.destroy(result.public_id)));

const PROPERTY_STATUSES = ['draft', 'published'];
const propertyStatus = (value, fallback = 'draft') =>
  PROPERTY_STATUSES.includes(value) ? value : fallback;

async function destroyUnusedAssets(assets = []) {
  const ids = [...new Set(assets.map((asset) => asset.publicId).filter(Boolean))];
  if (!ids.length) return;
  try {
    const stillUsed = await findReferencedAssets(ids);
    await Promise.allSettled(
      ids.filter((id) => !stillUsed.has(id)).map((id) => cloudinary.uploader.destroy(id))
    );
  } catch (err) {
    console.error('Cloudinary cleanup failed:', err.message);
  }
}

function parseRemoveIds(value) {
  try {
    const list = JSON.parse(value || '[]');
    return Array.isArray(list) ? list.map((id) => String(id)) : [];
  } catch {
    return [];
  }
}

router.get('/', async (req, res) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    let isAdmin = false;
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        isAdmin = true;
      } catch {
        isAdmin = false;
      }
    }
    const { page, limit, search, status, type, location, budget, sort } = parseListQuery(
      req.query,
      { defaultLimit: isAdmin ? 20 : 0 }
    );
    const result = await listProperties({
      publishedOnly: !isAdmin,
      page,
      limit,
      search,
      status: isAdmin ? status : '',
      type,
      location,
      budget,
      sort: isAdmin ? '' : sort
    });
    res.json({
      success: true,
      data: result.items,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      },
      ...(isAdmin
        ? {
            counts: result.counts,
            filters: {
              statuses: [
                { value: '', label: 'All properties', count: result.counts.all },
                { value: 'published', label: 'Published', count: result.counts.published },
                { value: 'draft', label: 'Drafts', count: result.counts.draft }
              ]
            }
          }
        : {})
    });
  } catch (err) {
    sendError(res, err);
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const property = await getProperty(req.params.id);
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    sendError(res, err);
  }
});

router.post('/', requireAuth, upload.array('images', 10), async (req, res) => {
  try {
    const title = cleanText(req.body.title, 160);
    if (!title) {
      return res.status(400).json({ success: false, error: 'Property name is required' });
    }
    const uploaded = await uploadMany(req.files || []);
    let property;
    try {
      property = await createProperty({
        title,
        price: cleanText(req.body.price, 80),
        location: cleanText(req.body.location, 160),
        type: cleanText(req.body.type, 80),
        description: cleanMultiline(req.body.description, 4000),
        images: uploaded.map((result) => ({ url: result.secure_url, publicId: result.public_id })),
        status: propertyStatus(req.body.status),
        sourceEnquiry: cleanText(req.body.sourceEnquiry, 120) || undefined
      });
    } catch (err) {
      await destroyUploads(uploaded);
      throw err;
    }
    res.status(201).json({ success: true, data: property });
  } catch (err) {
    sendError(res, err);
  }
});

router.put('/:id', requireAuth, upload.array('images', 10), async (req, res) => {
  try {
    const existing = await getProperty(req.params.id);
    if (!existing) return res.status(404).json({ success: false, error: 'Property not found' });

    const removeIds = parseRemoveIds(req.body.removeImages);
    const removed = (existing.images || []).filter((image) => removeIds.includes(image.publicId));
    const kept = (existing.images || []).filter((image) => !removeIds.includes(image.publicId));

    const updates = {};
    if (Object.prototype.hasOwnProperty.call(req.body, 'title')) {
      const title = cleanText(req.body.title, 160);
      if (!title) return res.status(400).json({ success: false, error: 'Property name is required' });
      updates.title = title;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, 'price')) updates.price = cleanText(req.body.price, 80);
    if (Object.prototype.hasOwnProperty.call(req.body, 'location')) updates.location = cleanText(req.body.location, 160);
    if (Object.prototype.hasOwnProperty.call(req.body, 'type')) updates.type = cleanText(req.body.type, 80);
    if (Object.prototype.hasOwnProperty.call(req.body, 'description')) {
      updates.description = cleanMultiline(req.body.description, 4000);
    }
    if (PROPERTY_STATUSES.includes(req.body.status)) updates.status = req.body.status;

    const uploaded = await uploadMany(req.files || []);
    if (removed.length || uploaded.length) {
      updates.images = [
        ...kept,
        ...uploaded.map((result) => ({ url: result.secure_url, publicId: result.public_id }))
      ];
    }

    let property;
    try {
      property = await updateProperty(req.params.id, updates);
    } catch (err) {
      await destroyUploads(uploaded);
      throw err;
    }
    await destroyUnusedAssets(removed);
    res.json({ success: true, data: property });
  } catch (err) {
    sendError(res, err);
  }
});

router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    if (!PROPERTY_STATUSES.includes(req.body.status)) {
      return res.status(400).json({ success: false, error: 'Status must be draft or published' });
    }
    const property = await updateProperty(req.params.id, { status: req.body.status });
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    sendError(res, err);
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const property = await deleteProperty(req.params.id);
    if (!property) return res.status(404).json({ success: false, error: 'Property not found' });

    if (property.sourceEnquiry) {
      const linked = await findPropertyBySourceEnquiry(property.sourceEnquiry);
      if (!linked) await updateContact(property.sourceEnquiry, { property_id: null });
    }
    await destroyUnusedAssets(property.images || []);
    res.json({ success: true });
  } catch (err) {
    sendError(res, err);
  }
});

export default router;
