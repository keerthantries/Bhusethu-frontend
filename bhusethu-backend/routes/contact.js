import express from 'express';
import multer from 'multer';
import rateLimit from 'express-rate-limit';
import { v2 as cloudinary } from 'cloudinary';
import {
  listContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
  createProperty,
  getProperty,
  updateProperty,
  findPropertyBySourceEnquiry,
  findReferencedAssets,
  CONTACT_TYPES
} from '../store.js';
import { requireAuth } from '../middleware/auth.js';
import { parseListQuery, cleanText, cleanMultiline, isEmail, isPhone } from '../utils/query.js';
import { sendError } from '../utils/http.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();

const CONTACT_TYPE_LABELS = {
  buying_assistance: 'Buying assistance',
  selling_assistance: 'Selling assistance',
  due_diligence: 'Title verification',
  title_dispute: 'Dispute resolution',
  property_management: 'Property management',
  development_approval: 'Development',
  advertising: 'Property advertising',
  property_enquiry: 'Property enquiry',
  other: 'Other enquiry'
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 9 },
  fileFilter: (req, file, cb) => {
    const allowed =
      file.mimetype.startsWith('image/') ||
      ['application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.mimetype);
    if (allowed) return cb(null, true);
    const error = new Error('Only images, PDF or Word documents are allowed');
    error.status = 400;
    cb(error);
  }
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests. Please try again later.' }
});

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: file.mimetype.startsWith('image/') ? 'bhusethu/seller-photos' : 'bhusethu/seller-docs',
        resource_type: 'auto'
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    stream.end(file.buffer);
  });

const parseSellMessage = (raw = '') => {
  const details = {};
  const notes = [];
  raw.split(/\r?\n/).forEach((line) => {
    const pair = line.trim().match(/^([A-Za-z][^:]{0,38}):\s*(.+)$/);
    if (pair) details[pair[1].trim().toLowerCase()] = pair[2].trim();
    else if (line.trim() && !line.startsWith('[')) notes.push(line.trim());
  });
  return { details, note: notes.join('\n') };
};

async function verifyTurnstile(token, remoteip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token, remoteip: remoteip || '' }),
      signal: AbortSignal.timeout(5000)
    });
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

async function uploadMany(files = []) {
  const results = [];
  try {
    for (const file of files) {
      const result = await uploadToCloudinary(file);
      results.push({ file, result });
    }
    return results;
  } catch (err) {
    await Promise.allSettled(
      results.map(({ result }) => cloudinary.uploader.destroy(result.public_id))
    );
    throw err;
  }
}

const destroyUploads = (uploads = []) =>
  Promise.allSettled(uploads.map(({ result }) => cloudinary.uploader.destroy(result.public_id)));

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

router.get('/', requireAuth, async (req, res) => {
  try {
    const { page, limit, search, type } = parseListQuery(req.query, { defaultLimit: 20 });
    const result = await listContacts({ page, limit, search, type });
    const typeFilters = CONTACT_TYPES
      .filter((key) => (result.counts[key] || 0) > 0 || key === type)
      .map((key) => ({
        value: key,
        label: CONTACT_TYPE_LABELS[key] || key,
        count: result.counts[key] || 0
      }));
    typeFilters.unshift({ value: '', label: 'All enquiries', count: result.counts.all || 0 });
    res.json({
      success: true,
      data: result.items,
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages
      },
      counts: result.counts,
      filters: { types: typeFilters }
    });
  } catch (err) {
    sendError(res, err);
  }
});

router.get('/:id', requireAuth, async (req, res) => {
  try {
    const contact = await getContact(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Enquiry not found' });
    res.json({ success: true, data: contact });
  } catch (err) {
    sendError(res, err);
  }
});

router.post(
  '/',
  contactLimiter,
  upload.fields([
    { name: 'images', maxCount: 6 },
    { name: 'documents', maxCount: 3 }
  ]),
  async (req, res) => {
    try {
      const client_name = cleanText(req.body.client_name, 120);
      const client_phone = cleanText(req.body.client_phone, 40);
      const client_email = cleanText(req.body.client_email, 160).toLowerCase();
      const service_type = cleanText(req.body.service_type, 60);
      const client_message = cleanMultiline(req.body.client_message, 5000);
      let property_id = cleanText(req.body.property_id, 80);
      if (property_id && !(await getProperty(property_id))) property_id = '';

      if (client_name.length < 2) {
        return res.status(400).json({ success: false, error: 'Please enter your full name' });
      }
      if (!isPhone(client_phone)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid phone number' });
      }
      if (!isEmail(client_email)) {
        return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
      }
      if (service_type && !CONTACT_TYPES.includes(service_type)) {
        return res.status(400).json({ success: false, error: 'Unknown enquiry type' });
      }

      const turnstileOk = await verifyTurnstile(
        req.body['cf-turnstile-response'],
        req.ip
      );
      if (!turnstileOk) {
        return res.status(400).json({ success: false, error: 'Verification failed. Please refresh and try again.' });
      }

      const imageFiles = req.files?.images || [];
      const documentFiles = req.files?.documents || [];
      let uploaded = [];
      let uploadedDocs = [];
      try {
        uploaded = await uploadMany(imageFiles);
        uploadedDocs = await uploadMany(documentFiles);
      } catch (err) {
        await destroyUploads([...uploaded, ...uploadedDocs]);
        throw err;
      }

      let contact;
      try {
        contact = await createContact({
          client_name,
          client_phone,
          client_email,
          service_type,
          client_message,
          property_id,
          images: uploaded.map(({ result }) => ({ url: result.secure_url, publicId: result.public_id })),
          documents: uploadedDocs.map(({ file, result }) => ({
            url: result.secure_url,
            publicId: result.public_id,
            name: file.originalname
          }))
        });
      } catch (err) {
        await destroyUploads([...uploaded, ...uploadedDocs]);
        throw err;
      }
      res.status(201).json({ success: true, data: contact });
    } catch (err) {
      sendError(res, err);
    }
  }
);

router.post('/:id/approve', requireAuth, async (req, res) => {
  try {
    const contact = await getContact(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Enquiry not found' });

    const existing =
      (await findPropertyBySourceEnquiry(contact.id)) ||
      (contact.property_id ? await getProperty(contact.property_id) : null);
    if (existing) {
      if (contact.property_id !== existing.id) {
        await updateContact(contact.id, { property_id: existing.id });
      }
      return res.status(409).json({ success: false, error: 'A property draft already exists for this enquiry' });
    }
    if (!contact.images?.length) {
      return res.status(400).json({ success: false, error: 'This enquiry has no property photos to publish' });
    }

    const { details, note } = parseSellMessage(contact.client_message || '');
    const type = details['property type'] || '';
    const location = details['location'] || details['preferred area'] || '';
    const price = details['expected price'] || details['budget'] || '';
    const title =
      [type, location && `in ${location}`].filter(Boolean).join(' ') ||
      `Property from ${contact.client_name}`;

    const property = await createProperty({
      title,
      price,
      location,
      type,
      description: note || contact.client_message || '',
      images: contact.images.map((image) => ({ url: image.url, publicId: image.publicId })),
      status: 'draft',
      sourceEnquiry: contact.id
    });
    await updateContact(contact.id, { property_id: property.id });

    res.status(201).json({ success: true, data: property });
  } catch (err) {
    sendError(res, err);
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const contact = await deleteContact(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: 'Enquiry not found' });

    if (contact.property_id) {
      const property = await getProperty(contact.property_id);
      if (property?.sourceEnquiry === contact.id) {
        await updateProperty(property.id, { sourceEnquiry: null });
      }
    }
    await destroyUnusedAssets([...(contact.images || []), ...(contact.documents || [])]);
    res.json({ success: true });
  } catch (err) {
    sendError(res, err);
  }
});

export default router;
