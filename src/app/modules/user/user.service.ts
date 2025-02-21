import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {

    


  // If password is not given , use default password
  if (!password) {
    password = config.default_password as string;
  }

  const result = await User.create(studentData);

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
