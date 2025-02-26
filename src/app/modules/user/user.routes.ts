import express from 'express';
import { userController } from './user.controller';
import { studentValidations } from '../Students/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-students',
  validateRequest(studentValidations.createSudentValidatedSchema),
  userController.createStudent,
);

export const userRoutes = router;
