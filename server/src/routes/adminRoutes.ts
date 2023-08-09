import express from 'express';
import { createAdmin, fetchAllAdmin, loginAdmin } from '../controllers/adminControllers';
import { adminAuth } from '../middleware/adminAuths';

const router = express.Router();

router.post('/create', createAdmin);
router.post('/login', loginAdmin);
router.get('/fetch', fetchAllAdmin);

export default router;