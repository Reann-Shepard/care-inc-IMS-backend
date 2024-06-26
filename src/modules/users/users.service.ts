import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const userCreateInput = { ...createUserDto, password: hashedPassword };
    const user = await this.userRepository.createUser(userCreateInput);
    return new UserDto(user);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    return plainToClass(UserDto, user);
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.getUserByName(name);
    return plainToClass(UserDto, user);
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    const user = await this.userRepository.updateUser(id, data);
    return plainToClass(UserDto, user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.deleteUser(id);
    return plainToClass(UserDto, user);
  }
}
