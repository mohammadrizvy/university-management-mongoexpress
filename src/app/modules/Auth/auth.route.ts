import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';

const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.student, USER_ROLE.faculty, USER_ROLE.admin),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);
router.post(
  '/forget-password',
  validateRequest(authValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
);
router.post(
  '/reset-password',
  validateRequest(authValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
);

export const authRoutes = router;
