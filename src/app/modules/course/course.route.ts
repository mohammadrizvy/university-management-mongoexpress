import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.admin),
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse,
);

router.get('/', courseController.getCourse);

router.get('/:id', auth("admin", 'faculty' , "student"), courseController.getSingleCourse);

router.delete('/:id', courseController.deleteCourse);

router.put(
  '/:courseId/assign_faculties',
  validateRequest(courseValidations.courseFacultyWithValidationSchema), // Fixed schema name
  courseController.assignFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove_faculties',auth("admin",), 
  validateRequest(courseValidations.courseFacultyWithValidationSchema),
  courseController.removeFacultiesWithCourse,
);

router.patch(
  '/:id',auth("admin",), 
  validateRequest(courseValidations.updateCreateCourseValidationSchema),
  courseController.updateCourese,
);

export const courseRoutes = router;
