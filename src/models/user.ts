import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    following: string[]; // Array of user IDs that this user follows
    createdAt: Date;
    updatedAt: Date;

}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }] ,// Array of user IDs that this user follows
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model<IUser>('User', UserSchema);
