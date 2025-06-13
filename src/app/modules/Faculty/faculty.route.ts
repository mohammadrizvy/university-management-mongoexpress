import express from 'express';
import { facultyController } from './factuly.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  facultyController.getFaculty,
);
router.get('/:facultyId', facultyController.getSingleFaculty);
router.patch(
  '/:facultyId',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyController.updateFaculty,
);
router.delete('/:facultyId', facultyController.deleteFactulty);

export const facultyRoutes = router;
