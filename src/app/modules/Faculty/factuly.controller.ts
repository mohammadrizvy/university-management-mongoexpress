import catchAsync from '../../utils/catchAsync';
import { FacultyServices } from './faculty.service';
import httpStatus from 'http-status';
import sendResponse from './../../utils/sendResponse';

const getFaculty = catchAsync(async (req, res, next) => {
  try {
    const result = await FacultyServices.getFacultyFromDB();
    sendResponse(res, {
      sucess: true,
      statusCode: httpStatus.FOUND,
      message: 'Faculties retrived sucessfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

const getSingleFaculty = catchAsync(async (req, res, next) => {
  try {
    const facultyId = req.params.facultyId;
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
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
  

  const { facultyId } = req.params;
  const result = await FacultyServices.deleteFacultyFromDB(facultyId);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.OK,
    message: 'Factulty deleted successfully',
    data: result,
  });

});

export const facultyController = {
  getFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFactulty,
};
