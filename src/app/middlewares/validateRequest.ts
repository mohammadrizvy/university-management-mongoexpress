import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

// !Express middleware to check validation
const validateRequest = (
  schema: AnyZodObject,
  updateSemesterRegistration?: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //* Validation Here
    await schema.parseAsync({
      body: req.body,
    });
    next();

  })
};

export default validateRequest;
