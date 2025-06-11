import { AppError } from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user dose exists ?

  const isUserExists = await User.isUserExistsByCustomId(payload.id)

  if (!isUserExists) {
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

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExists.password,
  );

  console.log(isPasswordMatch);

  // Access Granted : Send AccessToken , RefreshToken

  return {};
};

export const authServices = {
  loginUser,
};
