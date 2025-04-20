import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/', courseController.getCourse);

router.get('/:id', courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign_faculties',
  validateRequest(courseValidations.courseFacultyWithValidationSchema), // Fixed schema name
  courseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove_faculties',
  validateRequest(courseValidations.courseFacultyWithValidationSchema),
  courseController.removeFacultiesWithCourse,
);

router.patch(
  '/:id',
  validateRequest(courseValidations.updateCreateCourseValidationSchema),
  courseController.updateCourese,
);

export const courseRoutes = router;
