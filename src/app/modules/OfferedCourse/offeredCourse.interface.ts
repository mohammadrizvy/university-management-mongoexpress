import { Types } from 'mongoose';
import { Days } from './offeredCourse.const';

export type TOfferedCourse = {
  SemesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  day: Days;
  startTime: string;
  endTime: string;
};
