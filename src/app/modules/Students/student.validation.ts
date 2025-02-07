import { z } from 'zod';

const userNameSchema = z.object({
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

const localGuardianSchema = z.object({
  name: z.string({
    required_error: 'Local guardian name is required',
  }),
  occupation: z.string({
    required_error: 'Local guardian occupation is required',
  }),
  contactNo: z.number({
    required_error: 'Local guardian contact number is required',
  }),
  address: z.string({
    required_error: 'Local guardian address is required',
  }),
});

const guardianSchema = z.object({
  fatherName: z.string({
    required_error: 'Father name is required',
  }),
  fatherOccupation: z.string({
    required_error: 'Father occupation is required',
  }),
  fatherContactNumber: z.string({
    required_error: 'Father contact number is required',
  }),
  motherName: z.string({
    required_error: 'Mother name is required',
  }),
  motherOccupation: z.string({
    required_error: 'Mother occupation is required',
  }),
  motherContactNumber: z.string({
    required_error: 'Mother contact number is required',
  }),
});

 export const studentValidatedSchema = z.object({
  id: z.string({
    required_error: 'Student ID is required',
  }),
  pass : z.string({
    required_error: 'Pasword is required',
  }),
  name: userNameSchema,
  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required and must be either male or female',
  }),
  contact: z.number({
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
  bloodGroup: z.enum(['a+', 'ab+', 'a-', 'b+']).optional(),
  presentAddress: z.string({
    required_error: 'Present address is required',
  }),
  parmanentAddress: z.string({
    required_error: 'Permanent address is required',
  }),
  gaurdian: guardianSchema,
  localGaurdian: localGuardianSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(['active', 'inactive'], {
    required_error: 'Status must be either active or inactive',
  }),
});

