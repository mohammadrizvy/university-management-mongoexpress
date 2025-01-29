import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    
    // Validate data
    const zodValidatedData = studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDB(zodValidatedData);

    res.status(200).json({
      success: true,
      message: 'Student has been created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err)
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getStudents,
  getSingleStudent,
};
