import { Request, Response } from 'express';
import { studentValidatedSchema } from './student.validation';
import { StudentServices } from './student.service';


const createStudent = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = studentValidatedSchema.parse(req.body);

    // Create student in the database
    const result = await StudentServices.createStudentIntoDB(validatedData);

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create student',
      error: error,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(202).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve students',
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(202).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve student',
      error: error,
    });
  }
};

export const studentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
