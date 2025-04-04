import { flatten } from 'flat';
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
  const result = await Faculty.findOne({ id: facultyId });
  return result;
};

// const updateFacultyIntoDB = async (
//   facultyId: string,
//   payload: Partial<TFaculty>,
// ) => {
//   console.log('Updating faculty:', facultyId, payload);

//   const { name, ...remainingFacultyData } = payload;

//   const modifiedUpdatedData: Record<string, unknown> = {
//     ...remainingFacultyData,
//   };

//   /*
//     FORMAT : --- 
//     name.firstName = "Robart"
//     */

//   if (name && Object.keys(name).length) {
//     for (const [key, value] of Object.entries(name)) {
//       modifiedUpdatedData[`name.${key}`] = value;
//     }
//   }

//   console.log(modifiedUpdatedData);

//   const result = await Faculty.findOneAndUpdate(
//     { id: facultyId },
//     modifiedUpdatedData,
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   console.log('Update result:', result);
//   return result;
// };

const updateFacultyIntoDB = async (
    facultyId: string,
    payload: Partial<TFaculty>,
  ) => {
    console.log('Updating faculty:', facultyId, payload);
  
    // Use the flat library to flatten the nested object structure
    // The flatten function will convert nested objects to dot notation
    const modifiedUpdatedData : Record<string, unknown> = flatten(payload);
  
    console.log('Flattened update data:', modifiedUpdatedData);
  
    const result = await Faculty.findOneAndUpdate(
      { id: facultyId },
      modifiedUpdatedData,
      {
        new: true,
        runValidators: true,
      },
    );
  
    console.log('Update result:', result);
    return result;
  };


export const FacultyServices = {
  getFacultyFromDB,
  getSingleFacultyFromDB,
  updateFacultyIntoDB,
};
