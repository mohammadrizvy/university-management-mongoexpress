import config from '../../config';
import { TacademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genareateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //? create a user object
  const userData: Partial<TUser> = {};

  //? If password is not given , use default password
  userData.password = password || (config.default_password as string);

  //?  set user role
  userData.role = 'student';

  
  
  //? find addmissionSemester Info 
  const academicSemester = await AcademicSemester.findById(payload.admissionSemester)

  if (!academicSemester) {
    throw new Error('Academic semester not found');
  }

  //   set manually genareated (id)
  userData.id = await genareateStudentId(academicSemester);


  //?  creating a user
  const NewUser = await User.create(userData);

  // create a student
  if (Object.keys(NewUser).length) {
    // * set id & _id as user (ref)

    payload.id = NewUser.id;
    payload.user = NewUser._id; //*This will be the {ref} id that will be in student data,

    const newStudnet = await Student.create(payload);

    return newStudnet;
  }
};

export const UserService = {
  createStudentIntoDB,
};
