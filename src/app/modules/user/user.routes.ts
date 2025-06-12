import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../Students/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidation } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-students',auth(),
  validateRequest(studentValidations.createSudentValidatedSchema),
  userController.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
