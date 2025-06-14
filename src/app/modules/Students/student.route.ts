import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

// This will call controller function
router.get(
  '/',
  
  studentControllers.getStudents,
);
router.get('/:studentId',auth('student', 'admin', 'faculty'), studentControllers.getSingleStudent);
// ? used middlewares
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateSudentValidatedSchema),
  studentControllers.updateStudent,
);
router.delete('/:studentId', studentControllers.DeleteStudent);

export const studentRoutes = router;
