import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyServices } from './academicFaculty.service';

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
    message: 'Academic faculty retrieved successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await academicFacultyServices.updateSingleAcademicFacultyIntoDB(
    facultyId,
    req.body,
  );
  
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