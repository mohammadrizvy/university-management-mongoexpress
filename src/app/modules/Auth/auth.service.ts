import config from '../../config';
import { AppError } from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';

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
    userId: user,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30',
  });

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const authServices = {
  loginUser,
};
