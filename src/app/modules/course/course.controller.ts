import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import sendResponse from './../../utils/sendResponse';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req, res, next) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Course created succesfully',
    data: result,
  });
});

const getCourse = catchAsync(async (req, res, next) => {
  const result = await courseServices.getAllCoursesFromDB();
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Course retrived succesfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourse(id);
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Single course retrived sucessfully',
    data: result,
  });
});

// const updateFaculty = catchAsync(async (req, res, next) => {
//   const { facultyId } = req.params;
//   const { faculty } = req.body;

//   const result = await FacultyServices.updateFacultyIntoDB(facultyId, faculty);

//   sendResponse(res, {
//     sucess: true,
//     statusCode: httpStatus.OK,
//     message: 'Faculty updated sucessfully',
//     data: result,
//   });
// });

const deleteCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const facultyController = {
  createCourse,
  getCourse,
  getSingleCourse,
  deleteCourse,
};
