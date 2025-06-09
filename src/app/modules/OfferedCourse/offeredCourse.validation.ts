import { z } from 'zod';
import { Days } from './offeredCourse.const';

const createOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z.string().refine((time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    }, {
      message: "Start time must be in 24-hour format (e.g., 09:30, 14:45)"
    }),
    endTime: z.string().refine((time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    }, {
      message: "End time must be in 24-hour format (e.g., 09:30, 14:45)"
    }),
  }).refine((body) => {
    console.log(body)
    const start = new Date (`1970-01-01T${body.startTime}:00`)
    const end = new Date (`1970-01-01T${body.endTime}:00`)
    return end > start; 
  }, {
    message : "Start time should be before end time"
  }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    faculty: z.string().optional(),
    maxCapacity: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: z.string().refine((time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    }, {
      message: "Start time must be in 24-hour format (e.g., 09:30, 14:45)"
    }).optional(),
    endTime: z.string().refine((time) => {
      const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
      return regex.test(time);
    }, {
      message: "End time must be in 24-hour format (e.g., 09:30, 14:45)"
    }).optional(),
  }),
});

export const OfferedCourseValidation = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};