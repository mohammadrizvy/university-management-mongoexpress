import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // ?This is built-it static method
  // const result = await StudentModel.create(student);

  const student = new StudentModel(studentData);

  const result = await student.save();

  return result;
};

const getStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getStudentsFromDB,
  getSingleStudentFromDB,
};
