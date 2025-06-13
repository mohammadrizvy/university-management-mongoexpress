import { z } from 'zod';

// Create faculty name validation schema
const createFacultyNameValidationSchema = z.object({
  firstName: z.string({
    required_error: 'First name is required',
    invalid_type_error: 'First name must be a string',
  }),
  secoundName: z.string().optional(),
  lastName: z.string({
    required_error: 'Last name is required',
    invalid_type_error: 'Last name must be a string',
  }),
});

// Create faculty validation schema
const createFacultyValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    faculty: z.object({
      designation: z.string({ required_error: 'Designation is required' }),
      name: createFacultyNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required and must be either male or female',
      }),
      contactNo: z.number({
        required_error: 'Contact number is required',
      }),
      emergencyContact: z.number({
        required_error: 'Emergency contact number is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      DOB: z.string({
        required_error: 'Date of birth is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      profileImage: z.string().optional(),
      academicDepartment: z.string(),
      academicFaculty: z.string(),
    }),
  }),
});

// Update faculty name validation schema
const updateFacultyNameValidationSchema = z.object({
  firstName: z.string().optional(),
  secoundName: z.string().optional(),
  lastName: z.string().optional(),
});

// Update faculty validation schema
const updateFacultyValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      name: updateFacultyNameValidationSchema.optional(),
      gender: z.enum(['male', 'female']).optional(),
      contactNo: z.number().optional(),
      emergencyContact: z.number().optional(),
      email: z.string().email().optional(),
      DOB: z.string().optional(),
      presentAddress: z.string().optional(),
      profileImage: z.string().optional(),
      academicDepartment: z.string().optional(),
      academicFaculty: z.string().optional(),
    }),
  }),
});

export const facultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
