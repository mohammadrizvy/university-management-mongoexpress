import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { StudentSearchableFields } from './student.const';

// TODO GetStudentFromDB (!!!Many important concepet to clear for later)

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  //{email : {$regex : query.searchTerm , $options : i}}
  //{presentAddress : {$regex : query.searchTerm , $options : i}}
  //{"name.firstname" : {$regex : query.searchTerm , $options : i}}

  // TODO: (Raw Searching ) for later to understand

  // const StudentSearchableFields = ['email', 'name.firstName', 'presentAddress'];

  // let searchTerm = '';

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // const searchQuery = Student.find({
  //   $or: StudentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });

  // *Filtering

  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log({ query }, { queryObj });

  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'academicDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });

  // let sort = '-cretedAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // const sortQuery = filterQuery.sort(sort);

  // *Pagination (Important)
  //FORMULA : #limit = 10 , page = n , skip = (page-1 ) x limit

  // let page = 1;
  // let limit = 1;
  // let skip = 0;

  // if (query.limit) {
  //   limit = query.limit as number;
  // }

  // if (query.page) {
  //   page = query.page as number;
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // const limitQuery = paginateQuery.limit(limit);

  // * Field Liminting

  // let fields = '-__v';

  // { fields: 'name,email' } ----> { fields: 'name email' } , Need to add space in here

  // if (query.fields) {
  //   fields = (query.fields as String).split(',').join(' ');
  // console.log({fields})
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(StudentSearchableFields)
    .filter()
    .sort()
    .peginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  return result;
};

// !Update student ----
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
