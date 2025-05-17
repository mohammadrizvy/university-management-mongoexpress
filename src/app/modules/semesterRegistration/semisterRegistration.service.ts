import { AppError } from '../../Errors/AppErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesteRegistration } from './semisterRegistration.interface';
import httpStatus from 'http-status';
import { SemesterRegistration } from './semisterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesteRegistration,
) => {
  /**
   * (1) First, we check whether the semester exists in the database.
   *     If it doesn't, an error will be thrown.
   *
   * (2) Next, we check if the semester is already registered.
   *     If it isn't, the process continues. If it is already registered,
   *     a conflict error will be thrown with the message: "This semester is already registered!"
   */

  const academicSemester = payload?.academicSemester;

  // | Check if the semester dose exits?
  const isAcademicSemesterExits =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester is not found !',
    );
  }
  // ||  Check if the semester is already registerd or not
  const isSemesterRegistrationExits = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registerd ! ',
    );
  }

  const result = await SemesterRegistration.create(payload);

  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;

  return result;
};

const getSingleSemesterRegistrationFromDB = async (id : string) => {

  const result = await SemesterRegistration.findById(id)

  return result; 

};

const updateSemesterRegistrationIntoDB = async () => {};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
