import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// This will call controller function
router.get('/students', studentControllers.getStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
// ? used middlewares
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateSudentValidatedSchema),
  studentControllers.updateStudent,
);
router.delete('/:studentId', studentControllers.DeleteStudent);

export const studentRoutes = router;
