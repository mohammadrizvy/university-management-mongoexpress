import { AppError } from '../../Errors/AppErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesteRegistration } from './semisterRegistration.interface';
import httpStatus from 'http-status';
import { SemesterRegistration } from './semisterRegistration.model';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesteRegistration,
) => {
  /**
   * (1) So basically what happend here is , First we check if the the semester dose exits on DB or not .
   * If not then it will show thorw and an error .
   * (2) Then in 2nd phase we are checking if the semester is already registerd or not .
   * If not then it will pass or if the semster is alredy registerd it will throw conflict error that "This semester is already registerd!"
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

const getAllSemesterRegistrationFromDB = async () => {};

const getSingleSemesterRegistrationFromDB = async () => {};

const updateSemesterRegistrationIntoDB = async () => {};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
