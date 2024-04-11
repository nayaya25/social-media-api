import { Router } from 'express';
import { followAUser, getUsers } from '../controllers/userController';

const router = Router();

router.get('/', getUsers)

router.post('/follow', followAUser)

export default router;
