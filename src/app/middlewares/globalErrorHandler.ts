// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../Interface/error';

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

  const handleZodErro = (err: ZodError) => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });

    return {
      statusCode,
      message: 'Zod validation error',
      errorSources,
    };
  };

  if (err instanceof ZodError) {
    const simplifiedError = handleZodErro(err);

    statusCode = simplifiedError?.statusCode,
    message = simplifiedError?.message,
    errorSources = simplifiedError?.errorSources
  
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
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
