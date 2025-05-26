import express from "express"
import { offeredCourseControllers } from "./offeredCourse.controller";
const router = express.Router(); 

router.post("/" , offeredCourseControllers.createOfferCourse)
router.get ("/")

export const offeredCourseRouter = router; 