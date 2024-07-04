import { Role } from '@prisma/client';
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  role: z.nativeEnum(Role),
});

export type CreateUserDtoZod = z.infer<typeof createUserSchema>;
