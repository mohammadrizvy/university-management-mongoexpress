import { z } from 'zod';

export const userValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20)
    .optional(),
});
