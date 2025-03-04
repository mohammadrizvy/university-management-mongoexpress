import { TacademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TacademicSemester) => {
  //* MATCHING (Semester name ---> Semester code)

  type TacademicSemesterNameCodeMapper = {
    [Key: string]: string;
  };

  const academicSemesterNameCodeMapper: TacademicSemesterNameCodeMapper = {
    Autum: '01',
    Summer: '02',
    Fall: '03',
  };

  if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new Error ("Invalid Semester Code")
  }

  const reslut = await AcademicSemester.create(payload);
  return reslut;
};

("Hi There")dfsdfsdfsdfsdfsdfsddf 

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
