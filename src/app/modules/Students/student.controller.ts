import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Get the student data directly from req.body
    const studentData = req.body;
    
    // Validate data
    const zodValidatedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodValidatedData);

    res.status(201).json({
      success: true,
      message: 'Student has been created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Failed to create student',
      error: err
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(202).json({
      success: true,
      message: 'Student retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve students',
      error: error
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(202).json({
      success: true,
      message: 'Single student retrived successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve student',
      error: error
    });
  }
};

export const studentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
