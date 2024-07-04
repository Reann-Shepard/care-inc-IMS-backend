import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
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
    if (data.password && typeof data.password === 'string') {
      const hashedPassword = await this.hashPassword(data.password);
      data.password = { set: hashedPassword };
    }
    const user = await this.userRepository.updateUser(id, data);
    return plainToClass(UserDto, user);
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.deleteUser(id);
    return plainToClass(UserDto, user);
  }

  async findOne(name: string): Promise<UserDto | undefined> {
    return await this.userRepository.getUserByName(name);
  }
}
