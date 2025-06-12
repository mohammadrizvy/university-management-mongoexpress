import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';

const loginUser = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUser(req.body);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'User logged in sucessfully',
    data: result,
  });
});


const changePassword = catchAsync(async (req, res, next) => {
  const result = await authServices.changePassword();

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Password changed sucessfully',
    data: result,
  });
});



export const authController = {
  loginUser,changePassword
};
