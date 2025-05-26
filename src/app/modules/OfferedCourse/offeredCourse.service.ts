import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';

const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

export const offeredCourseServices = {
  createOfferedCourseIntoDb,
};
