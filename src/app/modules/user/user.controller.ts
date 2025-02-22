import { Request, Response } from "express";
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
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
  } catch (err : any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create student',
      error: err,
    });
  }
};


export const userController = {
    createStudent
}