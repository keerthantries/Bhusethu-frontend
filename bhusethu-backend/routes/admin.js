import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getAdminStats } from '../store.js';
import { sendError } from '../utils/http.js';

const router = express.Router();

router.get('/stats', requireAuth, async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    sendError(res, err);
  }
});

export default router;
