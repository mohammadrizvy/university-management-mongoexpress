import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../Errors/AppErrors';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';



// !Express middleware to checking authorization !!!
const auth = () => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // ?Checking if the token is sended from the the client or no !
      if (!token) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You're not authorized user",
        );
      }
      // ?Checking if the token is valid or not !
      // invalid token
      jwt.verify(
        token,
        config.jwt_access_secret as string,
        function (err, decoded) {
          // err
          if (err) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              "You're not authorized user (INVALID TOKEN) ",
            );
          }
          // decoded
          req.user = decoded as JwtPayload;
        },
      );

      next();
    },
  );
};

export default auth;
