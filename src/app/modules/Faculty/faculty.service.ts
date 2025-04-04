import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getFacultyFromDB = async () => {
  const result = await Faculty.find({ isDeleted: { $ne: true } }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  });

  return result;
};

const getSingleFacultyFromDB = async (facultyId: string) => {
  console.log(facultyId, 'Got data here');
  const result = await Faculty.findOne({ id: facultyId });
  return result;
};

const updateFacultyIntoDB = async (
    facultyId: string,
    payload: Partial<TFaculty>,
  ) => {
    console.log('services', {
      facultyId,
      payload,
    });
    
    
    const result = await Faculty.findOneAndUpdate({facultyId}, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  };

export const FacultyServices = {
  getFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};
