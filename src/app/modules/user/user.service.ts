import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { Faculty } from '../Faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import { verifyToken } from '../Auth/auth.utils';
import { imageToCloudinary } from '../../utils/sendImageToCloudinary';

// TODO : Important concept !!!
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {}; //? create a user object

  userData.password = password || (config.default_password as string); //? If password is not given , use default password

  userData.role = 'student'; //?  set user role
  userData.email = payload.email;

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

    // Send image to cloudinary 

    imageToCloudinary()

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
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  const userData: Partial<TUser> = {};

  userData.password = password || config.default_password;

  userData.role = 'faculty';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateFacultyId(payload);

    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create new user');
    }

    // create a Faculty
    // * set id & _id as user (ref)
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //*This will be the {ref} id that will be in student data,

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Fail to create new Faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
  // Create user data object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'admin';
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Generate admin ID
    userData.id = await generateAdminId(payload);

    // Create admin user
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin user');
    }

    // Set admin-specific data
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create admin
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getMe = async (userId: string, role: string) => {
  console.log(userId, role);

  let result = null;

  if (role === 'student') {
    result = await Student.findOne({ id: userId }).populate('user');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ id: userId }).populate('user');
  }
  if (role === 'faculty') {
    result = await Faculty.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const UserService = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  changeStatus,
};
