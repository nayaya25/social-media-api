import { body } from 'express-validator';

export const loginValidators = [
    body('email')
        .not()
        .isEmpty().withMessage('Email is Required')
        .trim().isEmail()
        .withMessage('Invalid email'),
    body('password').not().isEmpty().trim().withMessage('Missing Password')
]

export const registerValidators = [
    body('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    body('username')
        .not().isEmpty().trim()
        .withMessage('Missing/Invalid username'),
    body('password')
        .not().isEmpty().trim()
        .withMessage('Missing/Invalid password')
]