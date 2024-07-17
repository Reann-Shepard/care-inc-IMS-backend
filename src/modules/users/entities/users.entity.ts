import { Prisma } from '@prisma/client';
import { Role } from './role.enum';

export class User implements Prisma.UserUncheckedCreateInput {
  id: string;
  name: string;
  password: string;
  role: Role;
  email: string;
  phone: string;
}
