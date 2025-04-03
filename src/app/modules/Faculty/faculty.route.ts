import express from 'express';
import { facultyController } from './factuly.controller';

const router = express.Router();

router.get('/faculties', facultyController.getFaculty);
router.get('/faculties/:facultyId');
router.patch('/faculties/:facultyId');
router.delete('/faculties/:facultyId');

export const facultyRoutes = router;
