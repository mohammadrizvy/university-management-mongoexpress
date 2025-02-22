import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';
import { error } from 'console';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate the request body
    // const validatedData = studentValidatedSchema.parse(req.body);

    const { password, student: studentData } = req.body;

    // Create student in the database
    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Studnent created sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userController = {
  createStudent,
};
