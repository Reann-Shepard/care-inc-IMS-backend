import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async getUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async getUserByName(name: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { name },
    });
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
