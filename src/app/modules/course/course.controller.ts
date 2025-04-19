import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from './../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res, next) => {
  try {
    const result = await courseServices.createCourseIntoDB(req.body);
    sendResponse(res,{
        sucess: true,
        statusCode: httpStatus.FOUND,
        message: 'Course created succesfully',
        data: result, 
    })
  } catch (error) {

  }
});

const getCourse = catchAsync(async (req, res, next) => {
  try {
    const result = await courseServices.getAllCoursesFromDB();
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Course retrived succesfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  try {
    const facultyId = req.params.facultyId;
    const result = await courseServices.getSingleCourse(facultyId);
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Single faculty retrived sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const updateFaculty = catchAsync(async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const { faculty } = req.body;

    const result = await FacultyServices.updateFacultyIntoDB(
      facultyId,
      faculty,
    );

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Faculty updated sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const deleteFactulty = catchAsync(async (req, res, next) => {
  try {
    const { facultyId } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(facultyId);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Factulty deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

export const facultyController = {
  getFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFactulty,
};
