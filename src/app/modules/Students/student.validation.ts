import { z } from 'zod';

const createUserNameValidationSchema = z.object({
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

const createLocalGuardianValidationSchema = z.object({
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

const createGuardianValidationSchema = z.object({
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

const createSudentValidatedSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    student: z.object({
      name: createUserNameValidationSchema,
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
      gaurdian: createGuardianValidationSchema,
      localGaurdian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

// ? Update validation

const updateUserNameValidationSchema = z
  .object({
    firstName: z.string().optional(),
    secoundName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .optional();

const updateLocalGuardianValidationSchema = z
  .object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.number().optional(),
    address: z.string().optional(),
  })
  .optional();

const updateGuardianValidationSchema = z
  .object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNumber: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNumber: z.string().optional(),
  })
  .optional();

const updateSudentValidatedSchema = z.object({
  body: z
    .object({
      student: z
        .object({
          name: updateUserNameValidationSchema.optional(),
          gender: z.enum(['male', 'female']).optional(),
          contact: z.number().optional(),
          emergencyContact: z.number().optional(),
          email: z.string().email().optional(),
          DOB: z.string().optional(),
          bloodGroup: z.enum(['a+', 'ab+', 'a-', 'b+']).optional(),
          presentAddress: z.string().optional(),
          parmanentAddress: z.string().optional(),
          gaurdian: updateGuardianValidationSchema.optional(),
          localGaurdian: updateLocalGuardianValidationSchema.optional(),
          admissionSemester: z.string().optional(),
          academicDepartment: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
});
export const studentValidations = {
  createSudentValidatedSchema,
  updateSudentValidatedSchema,
};
