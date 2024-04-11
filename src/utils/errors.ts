export class NotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ValidationError extends Error {
    constructor(message: string, data: object = {}) {
        super(message);
        this.name = this.constructor.name;
    }
}


export class BadRequestError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}


export class ServerError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}


export class UnporcessableEntityError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}


export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}


export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}