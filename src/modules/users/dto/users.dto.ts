import { Role } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserDto {
  id: string;
  name: string;
  role: Role;
  email: string;
  phone: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
