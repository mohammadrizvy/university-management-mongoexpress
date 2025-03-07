import { TacademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TacademicSemester) => {
    // First time: starting from 0001
    let currentId = '0000';

    const lastStudentId = await findLastStudent();

    if (lastStudentId) {
        // Get last 4 digits of student ID
        const lastStudentSemesterCode = lastStudentId.substring(4, 6); // Extract semester code
        const lastStudentYear = lastStudentId.substring(0, 4); // Extract year
        const currentSemesterCode = payload.code;
        const currentYear = payload.year;

        // If same year and same semester, increment the ID
        if (lastStudentYear === currentYear && lastStudentSemesterCode === currentSemesterCode) {
            currentId = lastStudentId.substring(6); // Get the numeric part
        }
    }

    // Increment and pad with zeros
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    
    // Combine year, semester code, and incremented ID
    const generatedId = `${payload.year}${payload.code}${incrementId}`;

    return generatedId;
};