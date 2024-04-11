import { Request, Response, NextFunction } from 'express';
import {
    NotFoundError,
    ValidationError,
    UnporcessableEntityError,
    BadRequestError,
    ForbiddenError,
    ServerError,
    UnauthorizedError
} from '../utils/errors';

import { HTTP_CODES } from "../utils/constants";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof NotFoundError) {
        return res.status(HTTP_CODES.not_found).json({ message: err.message });
    }

    if (err instanceof ValidationError) {
        console.log(err)
        return res.status(HTTP_CODES.bad_request).json({ message: err.message });
    }

    if (err instanceof UnporcessableEntityError) {
        return res.status(HTTP_CODES.unprocessable_entity).json({ message: err.message });
    }

    if (err instanceof BadRequestError) {
        return res.status(HTTP_CODES.bad_request).json({ message: err.message });
    }

    if (err instanceof ForbiddenError) {
        return res.status(HTTP_CODES.forbidden).json({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
        return res.status(HTTP_CODES.unauthorized).json({ message: err.message });
    }

    if(err instanceof JsonWebTokenError || err instanceof TokenExpiredError){
        return res.status(HTTP_CODES.unprocessable_entity).json({ message: err.message });
    }

    if (err instanceof ServerError) {
        return res.status(HTTP_CODES.server_error).json({ message: err.message });
    }

    // Handle other types of errors
    res.status(HTTP_CODES.server_error).json({ message: 'Internal Server Error' });
};