import {NextFunction, Request, Response} from 'express';
import { User, Post } from '../models';
import { HTTP_CODES } from "../utils/constants";
import { NotFoundError, ServerError } from "../utils/errors";
import { sendNotificationToUser } from "../websocket";


export const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, text, media } = req.body;
        const newPost = await Post.create({ user: userId, text, media });
        res.status(HTTP_CODES.created).json(newPost);
    } catch (error: any) {
        next(error)
    }
};

export const getPostsByFollowingUsers = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser: any = req.user
    try {
        const { user } = currentUser;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const followingUsers = await User.findById(user.id).select('following');
        if(!followingUsers)
            throw new NotFoundError('You are not following any Users')

        const posts = await Post.find({ user: { $in: followingUsers.following } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json({ message: "Posts by following fetched", data: posts});
    } catch (error: any) {
        next(error)
    }
};
export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser: any = req.user
    try {
        const { user } = currentUser;

        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        if (!post.likes.includes(user.id)) {
            post.likes.push(user.id);
            await post.save();

            sendNotificationToUser(post.user, { type: 'like', postId });
        }

        res.json({ message: 'Post liked successfully' });
    } catch (error: any) {
        console.log(error)
        next(error)
    }
};

export const commentOnPost = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser: any = req.user
    const { user } = currentUser;

    try {
        const { postId } = req.params;
        const { text } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            throw new NotFoundError('Post not found');
        }
        const comment = { user: user.id, text }
        post.comments.push(comment);
        await post.save();

        sendNotificationToUser(post.user, { type: 'comment', ...comment });

        res.json({ message: 'Comment added successfully' });
    } catch (error: any) {
        next(error)
    }
};

export const getLikesCommentsCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;

        const result = await Post.findById(postId).select('likes comments');
        if(!result)
            throw new NotFoundError('Post Not Found')

        res.json({
            message: 'Counts Fetched',
            data: {
                numberOfLikes: result.likes.length,
                numberOfComments: result.comments.length
            }
        });
    } catch (error: any) {
        next(error)
    }
};

