import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // If password is not given , use default password
  userData.password = password || (config.default_password as string);

  //  set user role
  userData.role = 'student';

  //   set manually genareated (id)
  userData.id = '2030100010';

  //  creating a user
  const result = await User.create(userData);

  // create a student
  if (Object.keys(result).length) {
    // * set id & _id as user (ref)

    studentData.id = result.id;
    studentData.user = result._id;
  }

  return result;
};

export const UserService = {
  createStudentIntoDB,
};
