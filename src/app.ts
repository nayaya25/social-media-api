import express, { Request, Response, NextFunction } from 'express';
import rateLimit  from "express-rate-limit";
import cors from 'cors'
import { errorHandler } from "./middlewares/errorMiddleware";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";

import { UnauthorizedError } from "./utils/errors";
import { verifyToken } from "./utils/jwt";
import { JwtPayload } from "jsonwebtoken";

import morgan from 'morgan'

declare global {
    namespace Express {
        interface Request {
            user?: string | JwtPayload;
        }
    }
}

// Define a rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

const app = express();

// Middleware

app.use(limiter);
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes);
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        let bearerToken = req.headers.authorization;
        if(!bearerToken)
            throw new UnauthorizedError("Missing Token")

        const token = bearerToken.split(" ")[1];
        if(!token)
            throw new UnauthorizedError("Missing Token")

        let decodedToken = verifyToken(token)
        if(!decodedToken)
            throw new UnauthorizedError('Failed to Decode Token')

        req.user = decodedToken;


        next()
    } catch (e) {
        console.log(e)
        next(e)
    }
})

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

app.use(errorHandler)

export default app;