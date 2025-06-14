import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { authServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'User logged in sucessfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  console.log(req.user);
  const { ...passwordData } = req.body;
  const result = await authServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Password changed sucessfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authServices.refreshToken(refreshToken);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Access Token is retrived succesfully from refresh token !!! ',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await authServices.forgetPassword(userId);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Reset link is genarated sucessfully',
    data: result,
  });
});


const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const result = await authServices.resetPassword(req.body, token);

  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'Password reset sucessfull',
    data: result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword, resetPassword
};
