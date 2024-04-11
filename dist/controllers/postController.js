"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentOnPost = exports.likePost = exports.getPostsByFollowingUsers = exports.createPost = void 0;
const models_1 = require("../models");
const constants_1 = require("../utils/constants");
const errors_1 = require("../utils/errors");
const websocket_1 = require("../websocket");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, text, media } = req.body;
        const newPost = yield models_1.Post.create({ user: userId, text, media });
        res.status(constants_1.HTTP_CODES.created).json(newPost);
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getPostsByFollowingUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const followingUsers = yield models_1.User.findById(userId).select('following');
        if (!followingUsers)
            throw new errors_1.NotFoundError('You are not following any Users');
        const posts = yield models_1.Post.find({ user: { $in: followingUsers.following } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(posts);
    }
    catch (error) {
        next(error);
    }
});
exports.getPostsByFollowingUsers = getPostsByFollowingUsers;
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId } = req.body;
        const post = yield models_1.Post.findById(postId);
        if (!post) {
            throw new errors_1.NotFoundError('Post not found');
        }
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
            yield post.save();
            (0, websocket_1.sendNotificationToUser)(post.user, { type: 'like', postId });
        }
        res.json({ message: 'Post liked successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.likePost = likePost;
const commentOnPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, postId, text } = req.body;
        const post = yield models_1.Post.findById(postId);
        if (!post) {
            throw new errors_1.NotFoundError('Post not found');
        }
        post.comments.push({ user: userId, text });
        yield post.save();
        (0, websocket_1.sendNotificationToUser)(post.user, { type: 'comment', postId, comment: text });
        res.json({ message: 'Comment added successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.commentOnPost = commentOnPost;
