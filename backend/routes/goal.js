import express from 'express';
import { getGoals, setGoals } from '../controllers/goalController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/goals', protect, getGoals);
router.post('/goals', protect, setGoals);

export default router;