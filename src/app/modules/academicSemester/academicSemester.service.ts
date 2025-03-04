import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TacademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TacademicSemester) => {
  //* MATCHING (Semester name ---> Semester code)

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }

  const reslut = await AcademicSemester.create(payload);
  return reslut;
};

const getAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB
};
