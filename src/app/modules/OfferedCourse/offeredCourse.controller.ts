import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseServices } from './offeredCourse.service';
import httpStatus from 'http-status';

const createOfferCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDb(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    sucess: true,
    message: 'Offered course created succesfully',
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await offeredCourseServices.updateOfferedCourseIntoDB(
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Offered course updated succesfully',
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await offeredCourseServices.getAllOfferedCoursesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Offered courses retrieved sucessfully',
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Offered course retrieved sucessfully',
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Offered course deleted successfully',
    data: result,
  });
});

export const offeredCourseControllers = {
  createOfferCourse,
  updateOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  deleteOfferedCourse,
};
