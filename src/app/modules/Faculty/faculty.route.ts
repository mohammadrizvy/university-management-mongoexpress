import express from 'express';
import { facultyController } from './factuly.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/', facultyController.getFaculty);
router.get('/:facultyId', facultyController.getSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:facultyId' , facultyController.deleteFactulty);

export const facultyRoutes = router;
