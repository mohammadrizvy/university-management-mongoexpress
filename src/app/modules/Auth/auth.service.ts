import { AppError } from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user dose exists ?

  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = await User.isUserDeletedByCustomId(payload.id);

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  const userStatus = await User.isUserBlockedByCustomId(payload.id);

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // Checking if the password is correct ?
  const passwordMatch = await User.isPasswordMatch(
    payload?.password,
    user?.password,
  );

  // Access Granted : Send AccessToken , RefreshToken
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect ! ');
  }

  // Create token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByCustomId(userData.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = await User.isUserDeletedByCustomId(payload.id);

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  const userStatus = await User.isUserBlockedByCustomId(payload.id);

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // Checking if the password is correct ?
  const passwordMatch = await User.isPasswordMatch(
    payload?.oldPassword,
    user?.password,
  );
  if (!passwordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password is incorrect ! ');
  }

  // Need to hash the new password !!

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    { password: newHashedPassword, needsPasswordChange: false , passwordChangeAt : new Date() },
  );

  return null;
};

export const authServices = {
  loginUser,
  changePassword,
};
