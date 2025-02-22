import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { error } from "console";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body
    // const validatedData = studentValidatedSchema.parse(req.body);

    const {password , student : studentData} = req.body;

    // Create student in the database
    const result = await UserService.createStudentIntoDB(password , studentData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};


export const userController = {
    createStudent
}