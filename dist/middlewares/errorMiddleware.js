"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errors_1 = require("../utils/errors");
const constants_1 = require("../utils/constants");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    if (err instanceof errors_1.NotFoundError) {
        return res.status(constants_1.HTTP_CODES.not_found).json({ message: err.message });
    }
    if (err instanceof errors_1.ValidationError) {
        console.log(err);
        return res.status(constants_1.HTTP_CODES.bad_request).json({ message: err.message });
    }
    if (err instanceof errors_1.UnporcessableEntityError) {
        return res.status(constants_1.HTTP_CODES.unprocessable_entity).json({ message: err.message });
    }
    if (err instanceof errors_1.BadRequestError) {
        return res.status(constants_1.HTTP_CODES.bad_request).json({ message: err.message });
    }
    if (err instanceof errors_1.ForbiddenError) {
        return res.status(constants_1.HTTP_CODES.forbidden).json({ message: err.message });
    }
    if (err instanceof errors_1.UnauthorizedError) {
        return res.status(constants_1.HTTP_CODES.unauthorized).json({ message: err.message });
    }
    if (err instanceof jsonwebtoken_1.JsonWebTokenError || err instanceof jsonwebtoken_1.TokenExpiredError) {
        return res.status(constants_1.HTTP_CODES.unprocessable_entity).json({ message: err.message });
    }
    if (err instanceof errors_1.ServerError) {
        return res.status(constants_1.HTTP_CODES.server_error).json({ message: err.message });
    }
    // Handle other types of errors
    res.status(constants_1.HTTP_CODES.server_error).json({ message: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
