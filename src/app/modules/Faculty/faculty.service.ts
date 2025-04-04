
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';

const getFacultyFromDB = async () => {

    const result = await Faculty.find({ isDeleted: { $ne: true } }).populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    })

    return result;
}

const getSingleFacultyFromDB = async (facultyId: string) => {

    console.log(facultyId, "Got data here")

    const result = await Faculty.findOne({ id: facultyId })

    return result


}


export const FacultyServices = {
    getFacultyFromDB,
    getSingleFacultyFromDB
}