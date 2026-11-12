import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import propertyRoutes from './routes/properties.js';
import contactRoutes from './routes/contact.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import { connectDB, seedAdminFromEnv } from './store.js';

const app = express();
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV !== 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const allowedOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const isLocalOrigin = (origin) => {
  try {
    const { hostname } = new URL(origin);
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
  } catch {
    return false;
  }
};

const originAllowed = (origin) => {
  if (!origin) return true;
  if (isDev || isLocalOrigin(origin)) return true;
  return allowedOrigins.includes(origin);
};

const originMatchesHost = (origin, host) => {
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false;
  }
};

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Block state-changing requests coming from unknown browser origins (CSRF guard).
// Requests without an Origin header (server-to-server, curl) are left untouched.
app.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
  const origin = req.headers.origin;
  if (origin && !originAllowed(origin) && !originMatchesHost(origin, req.headers.host)) {
    return res.status(403).json({ success: false, error: 'Origin not allowed' });
  }
  next();
});

app.use(
  cors({
    origin: (origin, cb) => {
      if (originAllowed(origin)) return cb(null, true);
      const error = new Error('Origin not allowed');
      error.status = 403;
      cb(error);
    },
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/contact', contactRoutes);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || err.statusCode || (err.name === 'MulterError' ? 400 : 500);
  const message =
    status >= 500 && !isDev ? 'Something went wrong. Please try again.' : err.message;
  if (status >= 500) console.error(err);
  res.status(status).json({ success: false, error: message });
});

connectDB()
  .then(async () => {
    await seedAdminFromEnv();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Startup failed:', err.message);
    process.exit(1);
  });
