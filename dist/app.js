"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cors_1 = __importDefault(require("cors"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const errors_1 = require("./utils/errors");
const jwt_1 = require("./utils/jwt");
const morgan_1 = __importDefault(require("morgan"));
// Define a rate limiter
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 1000, // limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
const app = (0, express_1.default)();
// Middleware
app.use(limiter);
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/v1/auth', authRoutes_1.default);
app.use((req, res, next) => {
    try {
        let bearerToken = req.headers.authorization;
        if (!bearerToken)
            throw new errors_1.UnauthorizedError("Missing Token");
        const token = bearerToken.split(" ")[1];
        if (!token)
            throw new errors_1.UnauthorizedError("Missing Token");
        let decodedToken = (0, jwt_1.verifyToken)(token);
        if (!decodedToken)
            throw new errors_1.UnauthorizedError('Failed to Decode Token');
        req.user = decodedToken;
        next();
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
app.use('/api/v1/posts', postRoutes_1.default);
app.use(errorMiddleware_1.errorHandler);
exports.default = app;
