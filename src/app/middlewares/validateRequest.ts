import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

// !Express middleware to check validation
const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      //* Validation Here
      try {
        await schema.parseAsync({
          body: req.body,
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  };


  export default validateRequest