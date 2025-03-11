import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../Interface/error';

const handleDuplicateError = (err : any): TGenericErrorResponse => {
  // Define the regex pattern to extract the department name
  const regex = /dup key: \{ name: "(.*?)" \}/;
  
  // Apply regex on the error message
  const match = err.message.match(regex);
  
  // Extract the department name if found
  const departmentName = match ? match[1] : 'Unknown Department';

  const errorSources: TErrorSources = [
    {
      path: err.keyValue,
      message: `${departmentName} already exits`,
    },
  ];
  
  const statusCode = 400;

  return {
    statusCode,
    message: `Duplicate key error for department: ${departmentName}`,
    errorSources,
  };
};

export default handleDuplicateError;
