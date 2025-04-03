// Import the required types and models
import { TacademicSemester } from '../academicSemester/academicSemester.interface'; // Type for academic semester
import { TFaculty } from '../Faculty/faculty.interface';
import { User } from './user.model'; // User model for interacting with user data in the database

// !Student_______!

// Function to find the most recent student ID from the database
const findLastStudent = async () => {
  // We are querying the User model to find the most recent student.
  // It looks for a user with the role "student".
  // We only need the 'id' field (not the full user object), so we exclude '_id'.
  const lastStudent = await User.findOne(
    {
      role: 'student', // Searching for users with the 'student' role
    },
    {
      id: 1, // Only include the 'id' field in the result
      _id: 0, // Exclude the default '_id' field
    },
  )
    .sort({
      createdAt: -1, // Sort by creation date, descending to get the most recent student
    })
    .lean(); // Use lean to return a plain JavaScript object instead of a Mongoose document

  // If there is a last student, return their ID, otherwise return undefined
  return lastStudent?.id ? lastStudent.id : undefined;
};

// Function to generate a new student ID based on the current academic semester
export const generateStudentId = async (payload: TacademicSemester) => {
  // Initialize currentId as '0000' (the default starting point for the first student in a semester)
  let currentId = '0000';

  // Find the last student ID from the database
  const lastStudentId = await findLastStudent();

  // If there is a last student ID, we need to determine if we need to increment the ID
  if (lastStudentId) {
    // Extract the semester code from the last student's ID (the 5th and 6th characters)
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);

    // Extract the year from the last student's ID (the first 4 characters)
    const lastStudentYear = lastStudentId.substring(0, 4);

    // Get the current semester code and year from the 'payload' parameter
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    // If the year and semester are the same as the last student, we should increment the ID
    if (
      lastStudentYear === currentYear &&
      lastStudentSemesterCode === currentSemesterCode
    ) {
      // Get the numeric part of the last student's ID (the last 4 digits)
      currentId = lastStudentId.substring(6);
    }
  }

  // Increment the numeric part of the ID by 1, and pad it with leading zeros to ensure it's 4 digits
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  // Combine the year, semester code, and the incremented ID to form the new student ID
  const generatedId = `${payload.year}${payload.code}${incrementId}`;

  // Return the generated student ID
  return generatedId;
};

// !Faculty_______!

// Id Format : -->
// F-0001
// F-0002

const findLastFaculty = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
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

  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateFacultyId = async (payload: TFaculty) => {
  let currentId = '0000';

  const lastFacultyId = await findLastFaculty();

  // If last ID exists, extract and increment number
  if (lastFacultyId) {
    const lastIdNumber = lastFacultyId.substring(2);
    currentId = lastIdNumber;
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  const facultyId = `F-${incrementId}`;

  console.log(facultyId);

  return facultyId;
};
