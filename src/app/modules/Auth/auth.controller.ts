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

  const result = await authServices.loginUser(req.body);


  sendResponse(res, {
    sucess: true,
    statusCode: httpStatus.FOUND,
    message: 'User logged in sucessfully',
    data: result
  });


});

export const authController = {
  loginUser,
  changePassword, refreshToken
};
