import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    user: string;
    text: string;
    media?: string; // This can be a reference to media stored in a file storage service
    likes: string[]; // Array of user IDs who liked the post
    comments: {
        user: string;
        text: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    media: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of user IDs who liked the post
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        text: { type: String, required: true }
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

});

export const Post = mongoose.model<IPost>('Post', PostSchema);
