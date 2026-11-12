import dns from 'node:dns';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'node:crypto';
import mongoose from 'mongoose';

let useMongo = false;

const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

export const CONTACT_TYPES = [
  'buying_assistance',
  'selling_assistance',
  'due_diligence',
  'title_dispute',
  'property_management',
  'development_approval',
  'advertising',
  'property_enquiry',
  'other'
];

function readJson(name) {
  const file = path.join(dataDir, `${name}.json`);
  if (!fs.existsSync(file)) return [];
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

// Write to a temp file first so a crash can never leave a half-written JSON file.
function writeJson(name, data) {
  const file = path.join(dataDir, `${name}.json`);
  const temp = `${file}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temp, JSON.stringify(data, null, 2));
  fs.renameSync(temp, file);
}

const escapeRegex = (value = '') => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI not set — using local JSON storage');
    return;
  }
  const uri = process.env.MONGO_URI;
  if (uri.startsWith('mongodb+srv://')) {
    const host = uri.split('@')[1].split('/')[0];
    try {
      await dns.promises.resolveSrv(`_mongodb._tcp.${host}`);
    } catch {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    }
  }
  await mongoose.connect(uri, { dbName: 'bhusethu' });
  useMongo = true;
  await Promise.all([Property.createIndexes(), Contact.createIndexes(), Admin.createIndexes()]);
  console.log('MongoDB connected');
}

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    price: String,
    location: String,
    type: String,
    description: String,
    images: [{ url: String, publicId: String }],
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    sourceEnquiry: { type: String, index: true }
  },
  { timestamps: true }
);
propertySchema.index({ createdAt: -1 });
propertySchema.index({ status: 1, createdAt: -1 });
propertySchema.index({ type: 1 });
propertySchema.index({ 'images.publicId': 1 });

const contactSchema = new mongoose.Schema(
  {
    client_name: { type: String, required: true, trim: true },
    client_phone: { type: String, required: true, trim: true },
    client_email: String,
    service_type: { type: String, index: true },
    client_message: String,
    images: [{ url: String, publicId: String }],
    documents: [{ url: String, publicId: String, name: String }],
    property_id: { type: String, index: true }
  },
  { timestamps: true }
);
contactSchema.index({ createdAt: -1 });
contactSchema.index({ service_type: 1, createdAt: -1 });
contactSchema.index({ 'images.publicId': 1 });
contactSchema.index({ 'documents.publicId': 1 });

const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    passwordHash: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, enum: ['admin', 'editor'], default: 'admin' }
  },
  { timestamps: true }
);

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

const toPlain = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return { ...obj, id: String(obj._id || obj.id) };
};

const isDraft = (property) => property.status === 'draft';

const pageResult = (items, total, page, limit) => ({
  items,
  total,
  page,
  limit,
  totalPages: limit ? Math.max(1, Math.ceil(total / limit)) : 1
});

const sortNewest = (a, b) => {
  const left = new Date(a.createdAt || 0).getTime();
  const right = new Date(b.createdAt || 0).getTime();
  return right - left;
};

// Prices are stored as display text ("₹1.38 Cr onwards"), so budget and price
// sorting work from a numeric interpretation of that text.
export function parsePriceValue(price) {
  const text = String(price || '').toLowerCase().replace(/,/g, '');
  const match = text.match(/(\d+(?:\.\d+)?)\s*(crore|cr|lakhs|lakh|l|k)?/);
  if (!match) return 0;
  const num = parseFloat(match[1]) || 0;
  const unit = match[2] || (/cr|crore/.test(text) ? 'cr' : /lakh|\bl\b/.test(text) ? 'l' : '');
  if (unit === 'cr' || unit === 'crore') return Math.round(num * 10000000);
  if (unit === 'l' || unit === 'lakh' || unit === 'lakhs') return Math.round(num * 100000);
  if (unit === 'k') return Math.round(num * 1000);
  return Math.round(num);
}

const LOCATION_TERMS = {
  hyderabad: 'hyderabad',
  telangana: 'telangana',
  'andhra-pradesh': 'andhra'
};

// Filter slugs from the site map onto the free-text type values stored with
// properties (e.g. "apartment" -> "Apartment / Flat", "plot" -> "Plot / Land").
const TYPE_TERMS = {
  apartment: ['apartment', 'flat'],
  plot: ['plot', 'land'],
  villa: ['villa'],
  commercial: ['commercial', 'office', 'shop', 'retail']
};

const typeMatches = (property, type) => {
  if (!type || type === 'all') return true;
  const needles = TYPE_TERMS[type] || [type];
  const value = String(property.type || '').toLowerCase();
  return needles.some((needle) => value.includes(needle));
};

const budgetMatches = (property, budget) => {
  if (!budget || budget === 'all') return true;
  const value = parsePriceValue(property.price);
  if (budget === 'under-1cr') return value > 0 && value < 10000000;
  if (budget === '1-3cr') return value >= 10000000 && value <= 30000000;
  if (budget === 'above-3cr') return value > 30000000;
  return true;
};

const sortProperties = (items, sort) => {
  if (sort === 'price-asc') return [...items].sort((a, b) => parsePriceValue(a.price) - parsePriceValue(b.price));
  if (sort === 'price-desc') return [...items].sort((a, b) => parsePriceValue(b.price) - parsePriceValue(a.price));
  return [...items].sort(sortNewest);
};

export async function listProperties({
  publishedOnly = false,
  page = 1,
  limit = 0,
  search = '',
  status = '',
  type = '',
  location = '',
  budget = '',
  sort = ''
} = {}) {
  const term = String(search || '').trim();
  const filterStatus = publishedOnly ? 'published' : status;
  const usePaging = Number(limit) > 0;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(100, Number(limit) || 0));

  const baseQuery = {};
  if (type) {
    const patterns = (TYPE_TERMS[type] || [type]).map(escapeRegex);
    baseQuery.type = new RegExp(patterns.join('|'), 'i');
  }
  if (location && LOCATION_TERMS[location]) {
    baseQuery.location = new RegExp(LOCATION_TERMS[location], 'i');
  }
  if (term) {
    const rx = new RegExp(escapeRegex(term), 'i');
    baseQuery.$or = [{ title: rx }, { location: rx }, { type: rx }, { description: rx }];
  }

  const query = { ...baseQuery };
  if (filterStatus === 'draft') query.status = 'draft';
  else if (filterStatus === 'published') query.status = { $ne: 'draft' };

  if (useMongo) {
    const needsInMemory =
      Boolean(budget && budget !== 'all') || sort === 'price-asc' || sort === 'price-desc';

    if (needsInMemory) {
      const [docs, published, draft] = await Promise.all([
        Property.find(query),
        Property.countDocuments({ ...baseQuery, status: { $ne: 'draft' } }),
        Property.countDocuments({ ...baseQuery, status: 'draft' })
      ]);
      let items = docs.map(toPlain).filter((property) => budgetMatches(property, budget));
      items = sortProperties(items, sort);
      const total = items.length;
      if (usePaging) items = items.slice((safePage - 1) * safeLimit, safePage * safeLimit);
      return {
        ...pageResult(items, total, safePage, usePaging ? safeLimit : 0),
        counts: { all: published + draft, published, draft }
      };
    }

    const [docs, total, published, draft] = await Promise.all([
      (() => {
        let cursor = Property.find(query).sort({ createdAt: -1 });
        if (usePaging) cursor = cursor.skip((safePage - 1) * safeLimit).limit(safeLimit);
        return cursor;
      })(),
      Property.countDocuments(query),
      Property.countDocuments({ ...baseQuery, status: { $ne: 'draft' } }),
      Property.countDocuments({ ...baseQuery, status: 'draft' })
    ]);
    return {
      ...pageResult(docs.map(toPlain), total, safePage, usePaging ? safeLimit : 0),
      counts: { all: published + draft, published, draft }
    };
  }

  const all = readJson('properties');
  const searchMatches = (property) => {
    if (!typeMatches(property, type)) return false;
    if (
      location &&
      LOCATION_TERMS[location] &&
      !String(property.location || '').toLowerCase().includes(LOCATION_TERMS[location])
    ) {
      return false;
    }
    if (!term) return true;
    return [property.title, property.location, property.type, property.description]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(term.toLowerCase());
  };
  const base = all.filter(searchMatches);
  const published = base.filter((p) => !isDraft(p)).length;
  const draft = base.length - published;
  let matches = base;
  if (filterStatus === 'draft') matches = base.filter(isDraft);
  else if (filterStatus === 'published') matches = base.filter((p) => !isDraft(p));
  matches = sortProperties(
    matches.filter((property) => budgetMatches(property, budget)),
    sort
  );
  const items = usePaging
    ? matches.slice((safePage - 1) * safeLimit, safePage * safeLimit)
    : matches;
  return {
    ...pageResult(items, matches.length, safePage, usePaging ? safeLimit : 0),
    counts: { all: published + draft, published, draft }
  };
}

export async function createProperty(data) {
  const payload = {
    title: data.title,
    price: data.price || '',
    location: data.location || '',
    type: data.type || '',
    description: data.description || '',
    images: Array.isArray(data.images) ? data.images : [],
    status: data.status === 'published' ? 'published' : 'draft',
    sourceEnquiry: data.sourceEnquiry || undefined
  };
  if (useMongo) return toPlain(await Property.create(payload));
  const property = {
    id: randomUUID(),
    ...payload,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const properties = readJson('properties');
  properties.unshift(property);
  writeJson('properties', properties);
  return property;
}

export async function getProperty(id) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    return toPlain(await Property.findById(id));
  }
  return readJson('properties').find((p) => p.id === id) || null;
}

export async function findPropertyBySourceEnquiry(enquiryId) {
  if (!enquiryId) return null;
  if (useMongo) return toPlain(await Property.findOne({ sourceEnquiry: enquiryId }));
  return readJson('properties').find((p) => p.sourceEnquiry === enquiryId) || null;
}

export async function updateProperty(id, data) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    const property = await Property.findById(id);
    if (!property) return null;
    Object.assign(property, data);
    if (data.images) property.markModified('images');
    return toPlain(await property.save());
  }
  const properties = readJson('properties');
  const index = properties.findIndex((p) => p.id === id);
  if (index === -1) return null;
  properties[index] = {
    ...properties[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  writeJson('properties', properties);
  return properties[index];
}

export async function deleteProperty(id) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    return toPlain(await Property.findByIdAndDelete(id));
  }
  const properties = readJson('properties');
  const property = properties.find((p) => p.id === id);
  if (!property) return null;
  writeJson('properties', properties.filter((p) => p.id !== id));
  return property;
}

export async function listContacts({
  page = 1,
  limit = 0,
  search = '',
  type = ''
} = {}) {
  const term = String(search || '').trim();
  const usePaging = Number(limit) > 0;
  const safePage = Math.max(1, Number(page) || 1);
  const safeLimit = Math.max(1, Math.min(100, Number(limit) || 0));

  const baseQuery = {};
  if (term) {
    const rx = new RegExp(escapeRegex(term), 'i');
    baseQuery.$or = [
      { client_name: rx },
      { client_phone: rx },
      { client_email: rx },
      { service_type: rx },
      { client_message: rx }
    ];
  }
  const query = { ...baseQuery };
  if (type === 'other') query.service_type = { $nin: CONTACT_TYPES.filter((t) => t !== 'other') };
  else if (type) query.service_type = type;

  if (useMongo) {
    const [docs, total, grouped] = await Promise.all([
      (() => {
        let cursor = Contact.find(query).sort({ createdAt: -1 });
        if (usePaging) cursor = cursor.skip((safePage - 1) * safeLimit).limit(safeLimit);
        return cursor;
      })(),
      Contact.countDocuments(query),
      Contact.aggregate([
        { $match: baseQuery },
        { $group: { _id: '$service_type', count: { $sum: 1 } } }
      ])
    ]);
    const counts = { all: 0 };
    grouped.forEach((row) => {
      const key = CONTACT_TYPES.includes(row._id) ? row._id : 'other';
      counts[key] = (counts[key] || 0) + row.count;
      counts.all += row.count;
    });
    return {
      ...pageResult(docs.map(toPlain), total, safePage, usePaging ? safeLimit : 0),
      counts
    };
  }

  const all = readJson('contacts');
  const searchMatches = (contact) => {
    if (type === 'other') {
      if (CONTACT_TYPES.includes(contact.service_type) && contact.service_type !== 'other') return false;
    } else if (type && contact.service_type !== type) {
      return false;
    }
    if (!term) return true;
    return [
      contact.client_name,
      contact.client_phone,
      contact.client_email,
      contact.service_type,
      contact.client_message
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(term.toLowerCase());
  };
  const filtered = all.filter(searchMatches).sort(sortNewest);
  const counts = { all: 0 };
  all.forEach((contact) => {
    const key = CONTACT_TYPES.includes(contact.service_type) ? contact.service_type : 'other';
    counts[key] = (counts[key] || 0) + 1;
    counts.all += 1;
  });
  const items = usePaging
    ? filtered.slice((safePage - 1) * safeLimit, safePage * safeLimit)
    : filtered;
  return {
    ...pageResult(items, filtered.length, safePage, usePaging ? safeLimit : 0),
    counts
  };
}

export async function getContact(id) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    return toPlain(await Contact.findById(id));
  }
  return readJson('contacts').find((c) => c.id === id) || null;
}

export async function createContact(data) {
  if (useMongo) return toPlain(await Contact.create(data));
  const contact = {
    id: randomUUID(),
    client_name: data.client_name,
    client_phone: data.client_phone,
    client_email: data.client_email || '',
    service_type: data.service_type || '',
    client_message: data.client_message || '',
    property_id: data.property_id || '',
    images: data.images || [],
    documents: data.documents || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const contacts = readJson('contacts');
  contacts.unshift(contact);
  writeJson('contacts', contacts);
  return contact;
}

export async function findAdminByEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized) return null;
  if (useMongo) return toPlain(await Admin.findOne({ email: normalized }));
  return readJson('admins').find((admin) => admin.email === normalized) || null;
}

export async function upsertAdmin({
  email,
  passwordHash,
  name = 'Admin',
  role = 'admin'
}) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!normalized || !passwordHash) return null;
  if (useMongo) {
    return toPlain(
      await Admin.findOneAndUpdate(
        { email: normalized },
        { $set: { passwordHash, name, role } },
        { new: true, upsert: true, runValidators: true }
      )
    );
  }
  const admins = readJson('admins');
  const index = admins.findIndex((admin) => admin.email === normalized);
  if (index !== -1) {
    admins[index] = {
      ...admins[index],
      passwordHash,
      name,
      role,
      updatedAt: new Date().toISOString()
    };
    writeJson('admins', admins);
    return admins[index];
  }
  const admin = {
    id: randomUUID(),
    email: normalized,
    passwordHash,
    name,
    role,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  admins.unshift(admin);
  writeJson('admins', admins);
  return admin;
}

// First-run helper: create the admin from env only when that email does not
// exist yet, so later password changes made through the DB are never overwritten.
export async function seedAdminFromEnv() {
  const email = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!email || !passwordHash) return null;
  const existing = await findAdminByEmail(email);
  if (existing) return existing;
  const admin = await upsertAdmin({ email, passwordHash });
  if (admin) console.log(`Admin account seeded from env: ${admin.email}`);
  return admin;
}

export async function updateContact(id, data) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    const contact = await Contact.findById(id);
    if (!contact) return null;
    Object.assign(contact, data);
    if (data.images) contact.markModified('images');
    if (data.documents) contact.markModified('documents');
    return toPlain(await contact.save());
  }
  const contacts = readJson('contacts');
  const index = contacts.findIndex((c) => c.id === id);
  if (index === -1) return null;
  contacts[index] = {
    ...contacts[index],
    ...data,
    updatedAt: new Date().toISOString()
  };
  writeJson('contacts', contacts);
  return contacts[index];
}

export async function deleteContact(id) {
  if (useMongo) {
    if (!mongoose.isValidObjectId(id)) return null;
    return toPlain(await Contact.findByIdAndDelete(id));
  }
  const contacts = readJson('contacts');
  const contact = contacts.find((c) => c.id === id);
  if (!contact) return null;
  writeJson('contacts', contacts.filter((c) => c.id !== id));
  return contact;
}

// Cloudinary assets can be shared (an enquiry's photos become a property draft),
// so callers must check which ids are still referenced before destroying them.
export async function findReferencedAssets(publicIds = []) {
  const ids = [...new Set(publicIds.map((id) => String(id || '')).filter(Boolean))];
  if (!ids.length) return new Set();

  if (useMongo) {
    const [properties, contacts] = await Promise.all([
      Property.find({ 'images.publicId': { $in: ids } }, { 'images.publicId': 1 }).lean(),
      Contact.find(
        {
          $or: [
            { 'images.publicId': { $in: ids } },
            { 'documents.publicId': { $in: ids } }
          ]
        },
        { 'images.publicId': 1, 'documents.publicId': 1 }
      ).lean()
    ]);
    const referenced = new Set();
    properties.forEach((p) => (p.images || []).forEach((i) => ids.includes(i.publicId) && referenced.add(i.publicId)));
    contacts.forEach((c) => {
      (c.images || []).forEach((i) => ids.includes(i.publicId) && referenced.add(i.publicId));
      (c.documents || []).forEach((d) => ids.includes(d.publicId) && referenced.add(d.publicId));
    });
    return referenced;
  }

  const referenced = new Set();
  readJson('properties').forEach((p) =>
    (p.images || []).forEach((i) => ids.includes(i.publicId) && referenced.add(i.publicId))
  );
  readJson('contacts').forEach((c) => {
    (c.images || []).forEach((i) => ids.includes(i.publicId) && referenced.add(i.publicId));
    (c.documents || []).forEach((d) => ids.includes(d.publicId) && referenced.add(d.publicId));
  });
  return referenced;
}

export async function getAdminStats({ recentLimit = 5 } = {}) {
  const limit = Math.max(1, Math.min(20, Number(recentLimit) || 5));

  if (useMongo) {
    const [totalProperties, published, draft, totalEnquiries, recentContacts, recentProperties, latest] =
      await Promise.all([
        Property.countDocuments({}),
        Property.countDocuments({ status: { $ne: 'draft' } }),
        Property.countDocuments({ status: 'draft' }),
        Contact.countDocuments({}),
        Contact.find({}).sort({ createdAt: -1 }).limit(limit).lean(),
        Property.find({}).sort({ createdAt: -1 }).limit(limit).lean(),
        Contact.findOne({}).sort({ createdAt: -1 }).select('createdAt').lean()
      ]);
    return {
      properties: { total: totalProperties, published, draft },
      enquiries: { total: totalEnquiries, latestAt: latest?.createdAt || null },
      recentEnquiries: recentContacts.map((c) => ({
        id: String(c._id),
        client_name: c.client_name,
        client_phone: c.client_phone,
        client_email: c.client_email || '',
        service_type: c.service_type || '',
        createdAt: c.createdAt
      })),
      recentProperties: recentProperties.map(toPlain).map((p) => ({
        id: p.id,
        title: p.title,
        location: p.location || '',
        price: p.price || '',
        status: p.status || 'published',
        image: p.images?.[0]?.url || '',
        images: p.images?.length || 0,
        createdAt: p.createdAt
      }))
    };
  }

  const properties = [...readJson('properties')].sort(sortNewest);
  const contacts = [...readJson('contacts')].sort(sortNewest);
  return {
    properties: {
      total: properties.length,
      published: properties.filter((p) => !isDraft(p)).length,
      draft: properties.filter(isDraft).length
    },
    enquiries: {
      total: contacts.length,
      latestAt: contacts[0]?.createdAt || null
    },
    recentEnquiries: contacts.slice(0, limit).map((c) => ({
      id: c.id,
      client_name: c.client_name,
      client_phone: c.client_phone,
      client_email: c.client_email || '',
      service_type: c.service_type || '',
      createdAt: c.createdAt
    })),
    recentProperties: properties.slice(0, limit).map((p) => ({
      id: p.id,
      title: p.title,
      location: p.location || '',
      price: p.price || '',
      status: p.status || 'published',
      image: p.images?.[0]?.url || '',
      images: p.images?.length || 0,
      createdAt: p.createdAt
    }))
  };
}
