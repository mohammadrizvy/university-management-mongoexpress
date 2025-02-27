import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from '../user/user.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.OK,
      message: 'Studnent created sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});


export const academicSemesterController = {
    createAcademicSemester
} 