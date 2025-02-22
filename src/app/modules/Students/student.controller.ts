import { NextFunction, Request, Response } from 'express';
import { studentValidatedSchema } from './student.validation';
import { StudentServices } from './student.service';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();
    res.status(202).json({
      success: true,
      message: 'Students retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(202).json({
      success: true,
      message: 'Single student retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const DeleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(202).json({
      success: true,
      message: 'Student has deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

export const studentControllers = {
  getStudents,
  getSingleStudent,
  DeleteStudent,
};
