import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import {BadRequestError, NotFoundError, UnauthorizedError, ValidationError} from "../utils/errors";
import { HTTP_CODES } from "../utils/constants";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/jwt";

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new UnauthorizedError('Invalid Credentials')
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new UnauthorizedError('Password Mismatch. Try again!')

        }

        const { _id, email: userEmail } = user;

        // Generate JWT token
        const token = generateToken({ user: { id: _id, email: userEmail } });

        res.status(HTTP_CODES.ok).json({ token });
    } catch (error: any) {
        next(error)
    }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('User already Exists')
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(HTTP_CODES.created).json(newUser);
    } catch (error: any) {
        next(error)
    }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();

        res.status(HTTP_CODES.ok).json({ message: 'User Followed Successfully', data: users });
    } catch (error: any) {
        next(error)
    }
};

export const followAUser = async (req: Request, res: Response, next: NextFunction) => {
    const currentUser: any = req.user
    console.debug(currentUser)
    try {
        const { userId } = req.body;
        const userToBeFollowed = await User.find({ userId });
        if (!userToBeFollowed) {
            throw new NotFoundError('The User You are trying to follow is unavailable')
        }

        const follower = await User.findById(currentUser.user.id)
        if (!follower) {
            throw new NotFoundError('Your Profile seem to be missing at the moment. Try again')
        }
        follower.following.push(userId)
        follower.save()

        res.status(HTTP_CODES.ok).json({ message: 'User Followed Successfully' });
    } catch (error: any) {
        next(error)
    }
};
