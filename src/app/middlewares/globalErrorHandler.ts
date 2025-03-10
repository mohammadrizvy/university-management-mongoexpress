// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore

import { ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  type TErrorSources = {};

  const errorSources = [{}];

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;

//?error response pattern
/*
{
  success: "",
  message: "",
  errorSources: [
    path: "",
    message: ""
  ],
  stack  // only included in development environment
}
*/
