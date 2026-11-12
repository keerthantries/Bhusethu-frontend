import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import rateLimit from 'express-rate-limit';
import { requireAuth, COOKIE_NAME } from '../middleware/auth.js';
import { findAdminByEmail } from '../store.js';

const router = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 8 * 60 * 60 * 1000,
  path: '/'
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many login attempts. Try again in 15 minutes.' }
});

router.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body || {};
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ success: false, error: 'Server is not configured for login' });
  }
  const admin = await findAdminByEmail(email);
  const passwordOk = admin
    ? await bcrypt.compare(password || '', admin.passwordHash)
    : false;
  if (!admin || !passwordOk) {
    return res.status(401).json({ success: false, error: 'Invalid email or password' });
  }
  const token = jwt.sign(
    { email: admin.email, sub: admin.id, name: admin.name, role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.json({ success: true, data: { email: admin.email, name: admin.name, role: admin.role } });
});

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.json({ success: true });
});

router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, data: { email: req.admin.email } });
});

export default router;
