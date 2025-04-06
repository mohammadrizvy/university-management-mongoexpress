import express from 'express';
import { adminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/', adminController.getAdmins);
router.get('/:adminId', adminController.getSingleAdmin);
router.patch(
  '/:adminId',
  validateRequest(AdminValidation.updateAdminValidationSchema),
  adminController.updateAdmin,
);
router.delete('/:adminId', adminController.deleteAdmin);

export const adminRoutes = router;
