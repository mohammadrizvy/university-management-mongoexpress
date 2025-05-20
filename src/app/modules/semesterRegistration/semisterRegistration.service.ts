import { AppError } from '../../Errors/AppErrors';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesteRegistration } from './semisterRegistration.interface';
import httpStatus from 'http-status';
import { SemesterRegistration } from './semisterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.const';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesteRegistration,
) => {
  // Step 1: Ensure no semester with "UPCOMING" or "ONGOING" status already exists.
  // Only one semester can be active or upcoming at any given time.

  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester.`,
    );
  }

  const academicSemester = payload?.academicSemester;

  // Step 2: Verify that the academic semester exists in the database.
  // If not found, throw a "Not Found" error.

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The specified academic semester was not found.',
    );
  }

  //  Step 3: Check if the semester is already registered.
  //  If yes, throw a "Conflict" error to prevent duplicate registration.

  const isSemesterAlreadyRegistered = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester is already registered.',
    );
  }

  // Step 4: Create a new semester registration with the provided payload.

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
  // Check if the requested registerd semester exits in the DB or not !

  const isSemsesterExits = await SemesterRegistration.findById(id);

  if (!isSemsesterExits) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Semester dose not exits');
  }

  // If the requested semester is ENDED,  the we will not update anything

  const currentSemesterStatus = isSemsesterExits.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus == RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus}`,
    );
  }

  // UPCOMING -> ONGOING -> ENDED (Update flow)

  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't directly change status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
