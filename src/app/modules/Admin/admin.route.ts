import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/', adminController.getAdmins);
router.get('/:adminId');
router.patch('/:adminId');
router.delete('/:adminId');

export const adminRoutes = router;
