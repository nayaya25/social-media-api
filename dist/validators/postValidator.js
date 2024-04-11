"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createPostValidator = [
    (0, express_validator_1.body)('userId')
        .not()
        .isEmpty().withMessage('User Id is Required')
        .trim(),
    (0, express_validator_1.body)('text').not().isEmpty().trim().withMessage('Text is required')
];
