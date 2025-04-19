import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(
    courseValidations.createCourseValidationSchema,
  ),
  courseController.createCourse
);

router.get('/', courseController.getCourse);

router.get('/:id', courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     academicFacultyValidation.updateAcademicFacultyValidationSchema,
//   ),
//   courseController.updateAcademicFaculty,
// );

export const courseRoutes = router;
