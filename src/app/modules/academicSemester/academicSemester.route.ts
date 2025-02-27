import express from 'express';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

// This will call controller function
router.post('/create-academic-semester', academicSemesterController.createAcademicSemester)
// router.get('/students', studentControllers.getStudents);
// router.get('/:studentId', studentControllers.getSingleStudent);
// router.delete('/:studentId', studentControllers.DeleteStudent);

export const academicSemesterRoutes = router;
