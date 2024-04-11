"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidators = exports.loginValidators = void 0;
const express_validator_1 = require("express-validator");
exports.loginValidators = [
    (0, express_validator_1.body)('email')
        .not()
        .isEmpty().withMessage('Email is Required')
        .trim().isEmail()
        .withMessage('Invalid email'),
    (0, express_validator_1.body)('password').not().isEmpty().trim().withMessage('Missing Password')
];
exports.registerValidators = [
    (0, express_validator_1.body)('email')
        .not().isEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    (0, express_validator_1.body)('username')
        .not().isEmpty().trim()
        .withMessage('Missing/Invalid username'),
    (0, express_validator_1.body)('password')
        .not().isEmpty().trim()
        .withMessage('Missing/Invalid password')
];
