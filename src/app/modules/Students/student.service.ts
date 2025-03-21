import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getStudentsFromDB = async (query: Record<string, unknown>) => {

  console.log("base query", query)

  const queryObj = { ...query }

  console.log("duplicate query obj", queryObj)

  //{email : {$regex : query.searchTerm , $options : i}}
  //{presentAddress : {$regex : query.searchTerm , $options : i}}
  //{"name.firstname" : {$regex : query.searchTerm , $options : i}}

  // TODO: (Raw Searching ) for later to understand

  const StudentSearchableFields = ["email", "name.firstName", 'presentAddress']

  let searchTerm = ""

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string
  }

  const searchQuery = Student.find({
    $or: StudentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" }
    }))
  })

  // *Filtering 

  const excludeFields = ["searchTerm", "sort"]

  excludeFields.forEach(el => delete queryObj[el])


  const filterQuery = searchQuery.find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  let sort = "-cretedAt"

  if (query.sort) {
    sort = query.sort as string
  }


  const sortQuery = await filterQuery.sort(sort)




  return sortQuery;
};

const getSingleStudentFromDB = async (studentId: string) => {
  // const result = await Student.findOne({ id });

  const result = Student.findOne({ id: studentId })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, gaurdian, localGaurdian, ...reamainngStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...reamainngStudentData,
  };

  //TODO : Important concept

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (gaurdian && Object.keys(gaurdian).length) {
    for (const [key, value] of Object.entries(gaurdian)) {
      modifiedUpdatedData[`gaurdian.${key}`] = value;
    }
  }
  if (localGaurdian && Object.keys(localGaurdian).length) {
    for (const [key, value] of Object.entries(localGaurdian)) {
      modifiedUpdatedData[`localGaurdian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true, // This ensures the updated document is returned
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student');
    }

    await session.commitTransaction(), await session.endSession();

    return deletedStudent;
  } catch (error) {
    await session.abortTransaction(), await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Faild to delete student ');
  }
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
