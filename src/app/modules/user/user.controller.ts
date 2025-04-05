import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { Admin } from '../Admin/admin.model';

const createStudent: RequestHandler = async (req, res, next) => {
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

const createFaculty: RequestHandler = async (req, res, next) => {
  try {
    const { password, faculty: facultyData } = req.body;

    const result = await UserService.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Faculty created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const createAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { password, admin: adminData } = req.body;
    console.log(password, adminData);

    const result = await UserService.createAdminIntoDB(password , adminData)

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Studnent created sucessfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const userController = { createStudent, createFaculty, createAdmin };
