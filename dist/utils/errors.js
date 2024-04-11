"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = exports.UnauthorizedError = exports.UnporcessableEntityError = exports.ServerError = exports.BadRequestError = exports.ValidationError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends Error {
    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ValidationError = ValidationError;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.BadRequestError = BadRequestError;
class ServerError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ServerError = ServerError;
class UnporcessableEntityError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UnporcessableEntityError = UnporcessableEntityError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.ForbiddenError = ForbiddenError;
