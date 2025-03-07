import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty
);

router.get('/', academicFacultyController.getAllAcademicFaculties);

router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty
);

export const academicFacultyRoutes = router;