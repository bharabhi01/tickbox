import express from 'express';
const router = express.Router();
import { signup, login } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

router.post('/signup', protect, signup);
router.post('/login', protect, login);

export default router;
