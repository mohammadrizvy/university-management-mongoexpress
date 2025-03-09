import path from 'path';
import { Student } from './student.model';

const getStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path : "academicDepartment", 
      populate : {
        path : "academicFaculty"
      }
    });
  return result;
};

const getSingleStudentFromDB = async (studentId : string) => {
  // const result = await Student.findOne({ id });

  const result = Student.findOne({ id: studentId }).populate('admissionSemester')
  .populate({
    path : "academicDepartment", 
    populate : {
      path : "academicFaculty"
    }
  })
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true })  .populate('admissionSemester')
  .populate({
    path : "academicDepartment", 
    populate : {
      path : "academicFaculty"
    }
  });
  return result;
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
