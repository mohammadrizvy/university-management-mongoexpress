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
   * Step 1: Ensure no semester with "UPCOMING" or "ONGOING" status already exists.
   *         Only one semester can be active or upcoming at any given time.
   */
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester.`,
    );
  }

  const academicSemester = payload?.academicSemester;

  /**
   * Step 2: Verify that the academic semester exists in the database.
   *         If not found, throw a "Not Found" error.
   */
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The specified academic semester was not found.',
    );
  }

  /**
   * Step 3: Check if the semester is already registered.
   *         If yes, throw a "Conflict" error to prevent duplicate registration.
   */
  const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered.',
    );
  }

  /**
   * Step 4: Create a new semester registration with the provided payload.
   */
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

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');

  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesteRegistration>,
) => {
  // If the requested semester is ENDED,  the we will not update anything

  const requestedSemesterStatus = await SemesterRegistration.findById(id);

  if (requestedSemesterStatus?.status == 'ENDED') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${requestedSemesterStatus.status}`,
    );
  }
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
