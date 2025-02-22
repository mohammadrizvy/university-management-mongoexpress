import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

// This will call controller function
router.get('/students', studentControllers.getStudents);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.DeleteStudent);

export const studentRoutes = router;
