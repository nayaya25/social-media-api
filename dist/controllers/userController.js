"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const models_1 = require("../models");
const errors_1 = require("../utils/errors");
const constants_1 = require("../utils/constants");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            throw new errors_1.UnauthorizedError('Invalid Credentials');
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new errors_1.UnauthorizedError('Password Mismatch. Try again!');
        }
        const { _id, email: userEmail } = user;
        // Generate JWT token
        const token = (0, jwt_1.generateToken)({ user: { id: _id, email: userEmail } });
        res.status(constants_1.HTTP_CODES.ok).json({ token });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingUser = yield models_1.User.findOne({ email });
        if (existingUser) {
            throw new errors_1.BadRequestError('User already Exists');
        }
        // Hash password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield models_1.User.create({ username, email, password: hashedPassword });
        res.status(constants_1.HTTP_CODES.created).json(newUser);
    }
    catch (error) {
        next(error);
    }
});
exports.registerUser = registerUser;
