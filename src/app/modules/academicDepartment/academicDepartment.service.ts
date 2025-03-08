import { Types } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const isDepartmentExits = await AcademicDepartment.findOne({ name: payload.name })

  if (isDepartmentExits) {
    throw new Error("Department already exits!")
  }

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid department ID');
  }

  const result = await AcademicDepartment.findById(id);

  if (!result) {
    throw new Error('Academic Department not found');
  }

  return result;
};

const updateAcademicDepartmentFromDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error('Invalid department ID');
  }

  const result = await AcademicDepartment.findByIdAndUpdate(
    id,
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
  updateAcademicDepartmentFromDB,
}
