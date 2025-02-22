import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  const message = 'API NOT FOUND';

  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message,
  });
};

export default notFoundRoute;
