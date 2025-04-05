import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../Students/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-students',
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
  validateRequest(adminValidations.createAdminValidationSchema),
  userController.createAdmin,
);

export const userRoutes = router;
