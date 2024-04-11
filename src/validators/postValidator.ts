import { body } from 'express-validator';

export const createPostValidator = [
    body('userId')
        .not()
        .isEmpty().withMessage('User Id is Required')
        .trim(),
    body('text').not().isEmpty().trim().withMessage('Text is required')
]