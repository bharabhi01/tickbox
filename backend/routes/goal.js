import express from 'express';
import { getGoals, setGoals } from '../controllers/goalController.js';

const router = express.Router();

router.get('/goals', getGoals);
router.post('/goals', setGoals);

export default router;