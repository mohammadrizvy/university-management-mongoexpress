import { z } from 'zod';
import { SemesterRegistrationStatus } from './semesterRegistration.const';

const createSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'academicSemester is required',
    }),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});
const updateSemesterRegistrationValidationSchema = z.object({
  body: z.object({
    academicSemester: z.string({
      required_error: 'academicSemester is required',
    }).optional(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema
};
