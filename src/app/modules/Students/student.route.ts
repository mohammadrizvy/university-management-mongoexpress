import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

// This will call controller function
router.post('/create-student', studentControllers.createStudent);
router.get('/all-students', studentControllers.getStudents);
router.get('/:studentId', studentControllers.getSingleStudent);

export const studentRoutes = router;
