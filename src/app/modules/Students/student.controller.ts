import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getStudentsFromDB();

  console.log(result);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Students retrieved successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Single student retrieved successfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;
  console.log(studentId, student);
  const result = await StudentServices.updateStudentIntoDB(studentId, student);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Students updated successfully',
    data: result,
  });
});

const DeleteStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Student has deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getStudents,
  getSingleStudent,
  updateStudent,
  DeleteStudent,
};
