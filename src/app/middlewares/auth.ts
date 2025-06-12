import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../Errors/AppErrors';
import  httpStatus  from 'http-status';

// !Express middleware to checking authorization !!! 
const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  
    const token = (req.headers.authorization)
     console.log(token)

     if(!token){
      throw new AppError(
          httpStatus.UNAUTHORIZED,
          "You're not authorized user ",
        );
     }
    
    next(); 
  });
};

export default auth;
