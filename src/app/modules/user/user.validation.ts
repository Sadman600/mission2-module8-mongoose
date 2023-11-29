import { z } from 'zod';

export const userSchemaZod = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .max(10, { message: 'Must be 5 or fewer characters long' })
    .optional(),
});
