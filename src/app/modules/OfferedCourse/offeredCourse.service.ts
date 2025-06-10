import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from './../semesterRegistration/semisterRegistration.model';
import { AppError } from '../../Errors/AppErrors';
import httpStatus from 'http-status';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { hasTimeConflict } from './OfferCourse.utils';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;
  //! Check if the SemesterRegistration id is exists
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester Registration not found');
  }
  //? Extracting academicSemester from isSemesterRegistrationExits
  const academicSemester = isSemesterRegistrationExits.academicSemester;

  //! Check if the AcademicFaculty id is exists
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
  }
  //! Check if the AcademicDepartment id is exists
  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found');
  }
  //! Check if the Course id is exists
  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
  }
  //! Check if the Faculty id is exists
  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found');
  }

  //? check if the department is belong to that faculty?
  // TODO : Yet to understand this topic !!!
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartmentExits.name} is not belong to this ${isAcademicDepartmentExits.name} faculty `,
    );
  }

  //! Check if the  same offerd course same section in same registerd semester exists

  const isSameOfferedCourseExitsWithSameRegistredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      course,
      section,
    });

  if (isSameOfferedCourseExitsWithSameRegistredSemesterWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Offered course with same section already exits!',
    );
  }

  // ! Get the schedules of the faculties (Mean : By this function it will find all of offered couse that this faculty will take )

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime ');

  console.log(assignedSchedules);

  const newSchedules = { days, startTime, endTime };

  if (hasTimeConflict(assignedSchedules, newSchedules)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'The faculty is not availabe at that time ! Choose another date or time .',
    );
  }

  // const result = await OfferedCourse.create({ ...payload, academicSemester });

  // return result;
  return null;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDb,
};
