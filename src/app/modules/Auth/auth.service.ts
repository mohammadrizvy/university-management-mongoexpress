import { AppError } from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';

const loginUser = async (payload: TLoginUser) => {
  // Checking if the user dose exists ?

  const isUserExists = await User.findOne({ id: payload?.id });

  console.log(isUserExists);
  
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return {};
};

export const authServices = {
  loginUser,
};
