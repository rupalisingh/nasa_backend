import { NextFunction, Request, Response, RequestHandler } from "express";

class BadRequestError extends Error {
    status = 400;
    name: string;
    constructor(message: string) {
        super(message);
        this.name = 'BadRequestError'
    }
}

class NotFoundError extends Error {
    status = 404;
    name: string;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError'
    }
}

export default {
    BadRequestError,
    NotFoundError
}