import { z } from 'zod';

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      gender: z.enum(['male', 'female'], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact number is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z
        .object({
          firstName: z.string().optional(),
          middleName: z.string().optional(),
          lastName: z.string().optional(),
        })
        .optional(),
      designation: z.string().optional(),
      gender: z.enum(['male', 'female']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      managmentDeparment: z.string().optional(),
      academicFaculty: z.string().optional(),
      profileImage: z.string().optional(),
    }),
  }),
});

export const AdminValidation = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
