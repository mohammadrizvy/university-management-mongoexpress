import { Types } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>,
  ) => {
    // Ensure id is a valid ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID');
    }
  
    const result = await AcademicDepartment.findByIdAndUpdate(
      new Types.ObjectId(id),
      payload,
      {
        new: true,
        runValidators: true,
      },
    );
  
    if (!result) {
      throw new Error('Academic Department not found');
    }
  
    return result;
  };

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
}
