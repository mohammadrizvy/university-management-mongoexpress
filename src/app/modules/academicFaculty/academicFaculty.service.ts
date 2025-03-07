import { Types } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateSingleAcademicFacultyIntoDB = async (
    id: string,
    payload: Partial<TAcademicFaculty>,
  ) => {
    // Ensure id is a valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }
  
    const result = await AcademicFaculty.findByIdAndUpdate(
      new Types.ObjectId(id),
      payload,
      {
        new: true,
        runValidators: true,
      },
    );
  
    if (!result) {
      throw new Error('Academic Faculty not found');
    }
  
    return result;
  };

export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyIntoDB,
};