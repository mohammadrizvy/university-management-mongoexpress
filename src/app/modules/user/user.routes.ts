import express from "express"
import { userController } from "./user.controller";

const router = express.Router(); 


router.post("/create-students", userController.createStudent)
// router.post("/create-faculty")
// router.post("/create-admin")



export const userRoutes = router; 