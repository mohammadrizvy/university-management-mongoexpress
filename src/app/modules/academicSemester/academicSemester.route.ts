import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// This will call controller function
router.post('/create-academic-semester',validateRequest(academicSemesterValidation.createAcademicSemesterValidationSchema,),
  academicSemesterController.createAcademicSemester,
);
router.get("/", academicSemesterController.getSemesters )
router.get("/:id", academicSemesterController.getSingleAcademicSemester )

export const academicSemesterRoutes = router;
