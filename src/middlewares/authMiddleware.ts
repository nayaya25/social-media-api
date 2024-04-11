import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

const verifyAuth = (err: Error, req: Request, res: Response, next: NextFunction) => {

}

export default verifyAuth;
