import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(Course.find().populate("preRequisiteCourses.course"), query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .peginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourse = async (id: string) => {
  console.log(id)
  const result = await Course.findById( id ).populate("preRequisiteCourses.course");
  return result;
};

const updateCourseIntoDB = async (id : string , payload : TCourse) => {

}

const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    { new: true },
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourse,
  updateCourseIntoDB,
  deleteCourseFromDB,
};
