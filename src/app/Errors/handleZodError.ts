import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../Interface/error';


const handleZodErro = (err: ZodError) => {
  const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;


  type TGenericErrorResponse = {
    statusCode : number ;
    message : string; 
    errorSources : TErrorSources
  }

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleZodErro;
