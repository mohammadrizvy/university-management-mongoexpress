import { Response } from 'express';

type TResponse<T> = {
  statusCode: number;
  sucess: boolean;
  message?: string;
  data: T;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    sucess: data.sucess,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
