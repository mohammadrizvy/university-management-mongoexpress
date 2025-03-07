import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyController } from './academicFaculty.controller';

const router = express.Router();

// This will call controller function
router.post(
  '/create-academic-semester',
  validateRequest(
    academicFacultyValidation.academicFacultyValidationSchema,
  ),
  academicFacultyController.createAcademicFaculty,
);
router.get('/', academicFacultyController.getAcademicFaculty);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);
router.patch('/:id', academicFacultyController.updateSingleAcademicFaculty);

export const academicFacultyRoutes = router;
