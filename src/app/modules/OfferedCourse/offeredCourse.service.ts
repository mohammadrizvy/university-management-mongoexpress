import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import { SemesterRegistration } from './../semesterRegistration/semisterRegistration.model';
import { AppError } from '../../Errors/AppErrors';
import  httpStatus  from 'http-status';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {semesterRegistration ,academicFaculty, academicDepartment, course , faculty } = payload; 
  //! Check if the semester registration id is exists
  const isSemesterRegistrationExits = await SemesterRegistration.findById(semesterRegistration)

  if(!isSemesterRegistrationExits){
    throw new AppError(httpStatus.NOT_FOUND, "Semester Registration not found")
  }
  //! Check if the semester registration id is exists
  const isAcademicFacultyExits = await AcademicFaculty.findById(academicFaculty)

  if(!isAcademicFacultyExits){
    throw new AppError(httpStatus.NOT_FOUND, "Academic Faculty not found")
  }
  //! Check if the semester registration id is exists
  const isAcademicDepartmentExits = await AcademicDepartment.findById(academicDepartment)

  if(!isAcademicDepartmentExits){
    throw new AppError(httpStatus.NOT_FOUND, "Academic Department not found")
  }
  //! Check if the semester registration id is exists
  const isCourseExits = await Course.findById(course)

  if(!isCourseExits){
    throw new AppError(httpStatus.NOT_FOUND, "Course not found")
  }
  //! Check if the semester registration id is exists
  const isFacultyExits = await Faculty.findById(faculty)

  if(!isFacultyExits){
    throw new AppError(httpStatus.NOT_FOUND, "Faculty not found")
  }

  const result = await OfferedCourse.create(payload);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDb,
};
