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
  const result = await courseServices.getAllCoursesFromDB(req.query);
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

const updateCourese = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;

  // console.log(id , payload)
  const result = await courseServices.updateCourseIntoDB(id, payload);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Course updated sucessfully',
    data: result,
  });
});

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

const assignFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.assignFacultiesWithCourseIntoDB(courseId, faculties)

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Faculties assigned to course successfully',
    data: result,
  });
});

const removeFacultiesWithCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.removeFacultiesWithCourseIntoDB(courseId, faculties)

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Faculties removed to course successfully',
    data: result,
  });
});


export const courseController = {
  createCourse,
  getCourse,
  getSingleCourse,
  updateCourese,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse
};
