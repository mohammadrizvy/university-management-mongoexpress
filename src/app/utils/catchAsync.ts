// ! This is a very important concept. Using higher oder function to avoid try-catch repetition 

import { NextFunction, Request, RequestHandler, Response } from "express";

// TODO : Understand this concept for later.
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync; 

