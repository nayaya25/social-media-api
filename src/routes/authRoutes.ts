import { Router } from 'express';
import { loginUser, registerUser, followAUser } from '../controllers/userController';
import { loginValidators, registerValidators } from "../validators/authValidator";
import { validate } from "../validators/validate";

const router = Router();

router.post('/register', registerValidators, validate, registerUser);
router.post('/login', loginValidators, validate, loginUser)
router.post('/follow', followAUser)

export default router;
