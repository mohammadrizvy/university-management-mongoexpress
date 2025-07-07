import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrolledCourseServices } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Student is enrolled succesfully',
    data: result,
  });
});
console.log("first")
const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    sucess: true,
    message: 'Marks is updated succesfully',
    data: result,
  });
});

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
};
