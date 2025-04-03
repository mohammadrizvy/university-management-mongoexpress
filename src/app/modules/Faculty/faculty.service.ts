
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getFacultyFromDB = async () => {

    const result = await Faculty.find().populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })

return result ; 
}


export const FacultyServices = {
    getFacultyFromDB
}