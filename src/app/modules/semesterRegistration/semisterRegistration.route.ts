import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SemesterRegistrationValidations } from './semisterRegistration.validation';
import { semesterRegistrationControllers } from './semisterRegistration.controller';
const router = express.Router();

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegistrationValidationSchema,
  ), semesterRegistrationControllers.createSemesterRegistration
);

export const semesterRegistrationRoutes = router;
