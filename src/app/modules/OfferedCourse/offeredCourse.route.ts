import express from 'express';
import { offeredCourseControllers } from './offeredCourse.controller';
import validateRequest from '../../middlewares/validateRequest';
import { OfferedCourseValidation } from './offeredCourse.validation';
const router = express.Router();

router.post(
  '/create-offer-course',
  validateRequest(OfferedCourseValidation.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferCourse,
);
router.patch(
  '/:id',
  validateRequest(OfferedCourseValidation.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
);
router.get('/', offeredCourseControllers.getAllOfferedCourses);
router.get('/:id', offeredCourseControllers.getSingleOfferedCourse);
router.delete('/:id', offeredCourseControllers.deleteOfferedCourse);

export const offeredCourseRouter = router;
