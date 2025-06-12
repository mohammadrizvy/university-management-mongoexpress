import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.loginUser,
);

export const authRoutes = router;
