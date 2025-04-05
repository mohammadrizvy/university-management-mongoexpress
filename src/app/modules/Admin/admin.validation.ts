import { z } from 'zod';

// Create admin name validation schema
const createAdminNameValidationSchema = z.object({
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

// Create admin validation schema
const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    admin: z.object({
      name: createAdminNameValidationSchema,
      designation: z.string({
        required_error: 'Designation is required',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required and must be either male or female',
      }),
      DOB: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }).email(),
      contactNo: z.number({
        required_error: 'Contact number is required',
      }),
      emergencyContact: z.number({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      parmanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      profileImage: z.string().optional(),
      managmentDeparment: z.string().optional(),
      academicFaculty: z.string()
    }),
  }),
});

// Update admin name validation schema
const updateAdminNameValidationSchema = z.object({
  firstName: z.string().optional(),
  secoundName: z.string().optional(),
  lastName: z.string().optional(),
});

// Update admin validation schema
const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateAdminNameValidationSchema.optional(),
      designation: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      DOB: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.number().optional(),
      emergencyContact: z.number().optional(),
      presentAddress: z.string().optional(),
      parmanentAddress: z.string().optional(),
      profileImage: z.string().optional(),
      managmentDeparment: z.string().optional(),
      academicFaculty: z.string().optional()
    }),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};