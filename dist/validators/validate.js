"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationError = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const constants_1 = require("../utils/constants");
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    let formatted = errors.formatWith(exports.formatValidationError);
    return res.status(constants_1.HTTP_CODES.unprocessable_entity).json({
        message: formatted.array(),
    });
};
exports.validate = validate;
const formatValidationError = (error) => {
    return { [error.path]: error.msg };
};
exports.formatValidationError = formatValidationError;
