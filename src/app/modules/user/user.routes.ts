import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../Students/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { AdminValidation } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-students',
  auth(USER_ROLE.admin),
  upload.single('file'),
  // validateRequest(studentValidations.createSudentValidatedSchema),

  userController.createStudent,
);
router.post(
  '/create-faculty',
  // auth(USER_ROLE.admin),
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty,
);
router.post(
  '/create-admin',
  // auth(USER_ROLE.admin),
  validateRequest(AdminValidation.createAdminValidationSchema),
  userController.createAdmin,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  userController.changeStatus,
);

router.get('/me', auth('student', 'admin', 'faculty'), userController.getMe);

export const userRoutes = router;
