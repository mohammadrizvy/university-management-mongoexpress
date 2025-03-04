import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserService } from '../user/user.service';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  try {
    const result = await academicSemesterServices.createAcademicSemesterIntoDB(
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

const getSemesters = catchAsync(async (req, res, next) => {
  try {
    const result = await academicSemesterServices.getAcademicSemesterFromDB();
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

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  try {
    const semesterId = req.params.id;
    const result =
      await academicSemesterServices.getSingleAcademicSemesterFromDB(
        semesterId,
      );
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

const updateSingleAcademicSemester = catchAsync(async(req , res , next) => {
  try {
  const updatedData = req.body; 
  const semesterId = req.params.id; 

  console.log(updatedData, semesterId)
  const result = await academicSemesterServices.updateSingleAcademicSemesterIntoDB(semesterId, updatedData); 
  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic semesters updated successfully',
    data: result,
  });
 } catch (error) {
  next(error)
 }

})

export const academicSemesterController = {
  createAcademicSemester,
  getSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester
};
