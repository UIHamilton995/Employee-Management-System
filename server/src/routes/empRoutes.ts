import express from 'express';
import { createUser, loginUser } from '../controllers/empController'
// import { userAuthentication } from '../middleware/empAuths';
import { adminAuth } from '../middleware/adminAuths';
import { deleteUser, fetchAllUsers, updateUser } from '../controllers/empController';

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.put('/update/:id', adminAuth, updateUser);
router.delete('/delete/:id', adminAuth, deleteUser);
router.get('/fetch', fetchAllUsers);
export default router;