import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';

// TODO : Important concept !!!
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}; //? create a user object

  userData.password = password || (config.default_password as string); //? If password is not given , use default password

  userData.role = 'student'; //?  set user role

  const academicSemester = await AcademicSemester.findById(
    //? find addmissionSemester Info
    payload.admissionSemester,
  );

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (!academicSemester) {
      throw new Error('Academic semester not found');
    }

    userData.id = await generateStudentId(academicSemester); //   set genareated (id)

    //?  creating a user
    const NewUser = await User.create([userData], { session }); //!(Transactio-1 )

    if (!NewUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create new user');
    }
    {
      // create a student
      // * set id & _id as user (ref)
      payload.id = NewUser[0].id;
      payload.user = NewUser[0]._id; //*This will be the {ref} id that will be in student data,

      const newStudnet = await Student.create([payload], { session }); //!(Transactio-2 )

      if (!newStudnet) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Faild to create new student ',
        );
      }

      await session.commitTransaction();
      await session.endSession();

      return newStudnet;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create new student ');
  }
};

export const UserService = {
  createStudentIntoDB,
};
