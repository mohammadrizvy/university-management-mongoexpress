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

const updateSingleAcademicSemesterIntoDB = async (
  semesterId: string,
  updatedData: Partial<TacademicSemester>,
) => {
  // TODO : Uderstand this concept later !!
  // Check if both name and code are provided in update data
  if (updatedData.name && updatedData.code) {
    // Get the expected code for the given semester name
    const expectedCode = academicSemesterNameCodeMapper[updatedData.name];
    if (expectedCode !== updatedData.code) {
      throw new Error(
        `Invalid semester code. ${updatedData.name} semester must use code ${expectedCode}`
      );
    }
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    semesterId, // Using semesterId directly since we're using findByIdAndUpdate
    updatedData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!result) {
    throw new Error('Academic semester not found');
  }

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterIntoDB,
};
