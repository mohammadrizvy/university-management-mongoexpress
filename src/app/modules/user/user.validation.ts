import { z } from 'zod';
import { UserStatus } from './user.const';

export const userValidationSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
    })
    .max(20)
    .optional(),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  changeStatusValidationSchema,
};
