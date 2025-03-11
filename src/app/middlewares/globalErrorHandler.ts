// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../Interface/error';
import config from '../config';
import handleZodErro from '../Errors/handleZodError';
import handleValidationError from '../Errors/handleValidationError';
import handleCastError from '../Errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  // ? Handling ZOD error here
  if (err instanceof ZodError) {
    const simplifiedError = handleZodErro(err);

    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err); 
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  } else if(err.name === "CastError") {
    const simplifiedError = handleCastError(err); 
    (statusCode = simplifiedError?.statusCode),
      (message = simplifiedError?.message),
      (errorSources = simplifiedError?.errorSources);
  }

  //! The ultimate return !//
  res.status(statusCode).json({
    success: false,
    message,
    // err,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
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
