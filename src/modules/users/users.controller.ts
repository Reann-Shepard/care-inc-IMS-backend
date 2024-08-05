import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { createUserSchema } from './dto/create-user.zod';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      // Validates with class-validator
      const errors = await validate(
        plainToInstance(CreateUserDto, createUserDto),
      );
      if (errors.length > 0) {
        throw new BadRequestException(errors);
      }

      // Validates with zod
      const parsed = createUserSchema.safeParse(createUserDto);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }

      return await this.userService.createUser(createUserDto);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new HttpException('Error creating user', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDto> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('name/:name')
  async getUserByName(@Param('name') name: string): Promise<UserDto | null> {
    const user = await this.userService.getUserByName(name);
    if (!user) {
      throw new HttpException(
        `User with name ${name} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch(':id')
  async updatePartialUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
