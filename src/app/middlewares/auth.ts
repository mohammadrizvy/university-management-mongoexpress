import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../Errors/AppErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

// !Express middleware to checking authorization !!!
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // ?Checking if the token is sended from the the client or no !
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized user");
    }
    // ?Checking if the token is valid or not !

    // invalid token - synchronous

    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    // ?Role checkig for authorization
    const role = decoded?.role;
    // "If the role from the decoded token does not match the role required by the protection middleware, an  error will be thrown
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You're not authorized user");
    }
    // decoded
    req.user = decoded;
    next();
  });
};

export default auth;
