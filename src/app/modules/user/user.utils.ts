import { TacademicSemester } from '../academicSemester/academicSemester.interface';

// * year , semester , 4 digit number
export const genareateStudentId = (payload: TacademicSemester) => {
  // This will happen only first time ,
  const currentId = (0).toString().padStart(4, '0');

  let incrementId =( Number(currentId) + 1).toString().padStart(4 , "0");

  incrementId = `${payload.year}${payload.code}${incrementId}`

  return incrementId; 
};
