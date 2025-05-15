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

export const SemesterRegistrationValidations = {
  createSemesterRegistrationValidationSchema,
};
