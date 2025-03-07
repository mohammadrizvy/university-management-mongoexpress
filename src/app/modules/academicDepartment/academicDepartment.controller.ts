import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicDepartmentServices } from './academicDepartment.service';
import { Types } from 'mongoose';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB();
  
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculties retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(DepartmentId);
  
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic Department retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { DepartmentId } = req.params;
  
    // Validate if DepartmentId is a valid ObjectId
    if (!Types.ObjectId.isValid(DepartmentId)) {
      return sendResponse(res, {
        sucess: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Invalid Department ID',
        data: null,
      });
    }
  
    const result = await academicDepartmentServices.updateSingleAcademicDepartmentIntoDB(
      DepartmentId,
      req.body,
    );
  
    if (!result) {
      return sendResponse(res, {
        sucess: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Academic Department not found',
        data: null,
      });
    }
    
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department updated successfully',
      data: result,
    });
  });

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicFaculties,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};