import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { semesterRegistrationServices } from './semisterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res ) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Semster Registerd succesfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
};
