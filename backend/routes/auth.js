import express from 'express';
const router = express.Router();
import { signup, login, getUserInfo } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

router.post('/signup', signup);
router.post('/login', login);
router.get('/userInfo', protect, getUserInfo);

export default router;