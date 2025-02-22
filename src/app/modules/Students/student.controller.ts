import { NextFunction, Request, Response } from 'express';
import { studentValidatedSchema } from './student.validation';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const DeleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Student has deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentControllers = {
  getStudents,
  getSingleStudent,
  DeleteStudent,
};
