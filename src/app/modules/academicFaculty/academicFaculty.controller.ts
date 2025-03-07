import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyServices } from './academicFaculty.service';
import { Types } from 'mongoose';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculty created successfully',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
  
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Academic faculties retrieved successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
  
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic faculty retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
  
    // Validate if facultyId is a valid ObjectId
    if (!Types.ObjectId.isValid(facultyId)) {
      return sendResponse(res, {
        sucess: false,
        statusCode: httpStatus.BAD_REQUEST,
        message: 'Invalid faculty ID',
        data: null,
      });
    }
  
    const result = await academicFacultyServices.updateSingleAcademicFacultyIntoDB(
      facultyId,
      req.body,
    );
  
    if (!result) {
      return sendResponse(res, {
        sucess: false,
        statusCode: httpStatus.NOT_FOUND,
        message: 'Academic Faculty not found',
        data: null,
      });
    }
    
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Academic faculty updated successfully',
      data: result,
    });
  });

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};