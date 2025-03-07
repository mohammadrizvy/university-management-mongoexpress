import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  try {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(
      req.body,
    );

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Academic Semester created sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getAcademicFaculty = catchAsync(async (req, res, next) => {
  try {
    const result = await academicFacultyServices.getAcademicFacultyFromDB();
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Academic semesters retrived',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  try {
    const semesterId = req.params.id;
    const result =
      await academicFacultyServices.getSingleAcademicFacultyFromDB(semesterId);
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Single Academic semesters retrived',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const updateSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  try {
    const updatedData = req.body;
    const semesterId = req.params.id;

    console.log(updatedData, semesterId);
    const result = await academicFacultyServices
      .updateSingleAcademicFacultyIntoDB
      // semesterId,
      // updatedData,
      ();
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Single Academic semesters updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
