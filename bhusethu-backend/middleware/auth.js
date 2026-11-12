import jwt from 'jsonwebtoken';

export const COOKIE_NAME = 'bhusethu_admin';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token =
    req.cookies?.[COOKIE_NAME] ||
    (header.startsWith('Bearer ') ? header.slice(7) : null);
  if (!token) return res.status(401).json({ success: false, error: 'Authentication required' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Session expired, please sign in again' });
  }
}
