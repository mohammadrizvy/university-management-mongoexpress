import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicDepartmentServices } from './academicDepartment.service';
import { Types } from 'mongoose';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic getAllAcademicDepartments retrieved successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const departmentId = req.params.departmentId;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department retrieved successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const _id = req.params.departmentId;
  const payload = req.body;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentFromDB(
      _id,
      payload,
    );

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
