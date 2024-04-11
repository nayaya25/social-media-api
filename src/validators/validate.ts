import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES } from "../utils/constants";

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }

    let formatted = errors.formatWith(formatValidationError)

    return res.status(HTTP_CODES.unprocessable_entity).json({
        message: formatted.array(),
    })
}


export const formatValidationError = (error: any) => {
        return { [error.path]: error.msg }
}