import { Router } from 'express';
import {
    createPost,
    getPostsByFollowingUsers,
    likePost,
    commentOnPost,
    getLikesCommentsCount
} from '../controllers/postController';
import { createPostValidator } from "../validators/postValidator";
import { validate } from "../validators/validate";

const router = Router();

router.post('/create', createPostValidator, validate, createPost);
router.get('/following', getPostsByFollowingUsers);
router.post('/:postId/like', likePost);
router.post('/:postId/comment', commentOnPost);
router.get('/:postId/likes-comments-count', getLikesCommentsCount);


export default router;
