import config from '../../config';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
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
  const NewUser= await User.create(userData);

  // create a student
  if (Object.keys(NewUser).length) {
    // * set id & _id as user (ref)

    studentData.id = NewUser.id;
    studentData.user = NewUser._id; //*This will be the {ref} id that will be in student data, 

    const newStudnet = await Student.create(studentData)

    return newStudnet

  }

};

export const UserService = {
  createStudentIntoDB,
};
