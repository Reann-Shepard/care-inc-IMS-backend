import { z } from 'zod';

export const SignInSchema = z
  .object({
    name: z.string(),
    password: z.string().min(6),
  })
  .required();

export type SignInDto = z.infer<typeof SignInSchema>;
