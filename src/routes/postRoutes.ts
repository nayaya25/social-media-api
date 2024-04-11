import { Router } from 'express';
import { createPost, getPostsByFollowingUsers, likePost, commentOnPost } from '../controllers/postController';
import { createPostValidator } from "../validators/postValidator";
import { validate } from "../validators/validate";

const router = Router();

router.post('/create', createPostValidator, validate, createPost);
router.get('/following', getPostsByFollowingUsers);
router.post('/like', likePost);
router.post('/comment', commentOnPost);

export default router;
