import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .peginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCourse = async (id: string) => {
  console.log(id);
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  // step 1 : Basic info update //Exclude preRequisiteCourses

  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );

  // check if there is any pre requisite course to update

  console.log(preRequisiteCourses)

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the {isDeleted : true } fields

    const deletedPreRequisite = preRequisiteCourses.filter(
      (el) => el.course && el.isDeleted,
    ).map(el => el.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull : {
        preRequisiteCourses : {course : {$in : deletedPreRequisite}}
      }
    })
     // filter out the {isDeleted : false } | new course fields
  const newPreRequisites = preRequisiteCourses?.filter(ele => ele.course && !ele.isDeleted)
  console.log({newPreRequisites})

  const newPreRequisitesCourses = await Course.findByIdAndUpdate(id , {
    $addToSet : {preRequisiteCourses : {$each : newPreRequisites}}
  })
  }

 
  const result = await Course.findById(id).populate("preRequisiteCourses.course")


  return result
};

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
