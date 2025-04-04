import express from 'express';
import { facultyController } from './factuly.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/faculties', facultyController.getFaculty);
router.get('/faculties/:facultyId' , facultyController.getSingleFaculty);
router.patch('/faculties/:facultyId');
router.delete('/faculties/:facultyId');

export const facultyRoutes = router;
