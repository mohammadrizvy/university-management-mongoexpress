import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AppError } from '../../Errors/AppErrors';

const createStudent = catchAsync(async (req, res, next) => {
  console.log(req.file, "File");

  const {  password, student: studentData } = req.body;

  // Create student in the database
  const result = await UserService.createStudentIntoDB(req.file ,password, studentData);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Studnent created sucessfully',
    data: null,
  });
});

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Faculty created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Studnent created sucessfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  const { userId, role } = req.user;

  const result = await UserService.getMe(userId, role);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Info retrived sucessfully',
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await UserService.changeStatus(id, req.body);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Status updated sucessfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
