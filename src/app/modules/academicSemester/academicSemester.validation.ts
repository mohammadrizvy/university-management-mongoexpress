import { string, z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthList,
} from './academicSemester.const';

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...(MonthList as [string, ...string[]])]),
    endMonth: z.enum([...(MonthList as [string, ...string[]])]),
  }),
});

export const academicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
