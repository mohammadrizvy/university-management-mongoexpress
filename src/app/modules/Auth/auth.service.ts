import { AppError } from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './auth.utils';

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

  // Create access token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
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

  const isDeleted = await User.isUserDeletedByCustomId(userData.userId);

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  const userStatus = await User.isUserBlockedByCustomId(userData.userId);

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
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // ?Checking if the token is valid or not !

  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = await User.isUserDeletedByCustomId(userId);

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  const userStatus = await User.isUserBlockedByCustomId(userId);

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  if (
    user.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangeAt, iat as number)
  ) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You're not authorized user right now bud !! ",
    );
  }

  // Create access token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = await User.isUserDeletedByCustomId(userId);

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }
  const userStatus = await User.isUserBlockedByCustomId(userId);

  if (userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // Create access token and sent to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    "10m"
  );

  const resetUILink = `http://localhost:3000/api/v1?id=${user.id}token=${}`

};



export const authServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
