import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// This will call controller function
router.post('/create-academic-semester',validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema,),
  academicSemesterController.createAcademicSemester,
);
router.get("/",  )
// router.get('/students', studentControllers.getStudents);
// router.get('/:studentId', studentControllers.getSingleStudent);
// router.delete('/:studentId', studentControllers.DeleteStudent);

export const academicSemesterRoutes = router;
