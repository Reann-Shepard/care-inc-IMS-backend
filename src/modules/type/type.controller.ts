import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { Role, Type } from '@prisma/client';
import { TypeDto } from './dto/type.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Roles } from 'src/middleware/roles.decorator';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getAllTypes() {
    try {
      return this.typeService.getAllTypes();
    } catch (error) {
      console.log(error);
      throw new HttpException('Types not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getThisType(@Param('id', ParseIntPipe) id: number): Promise<Type> {
    try {
      return this.typeService.getThisType(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Type with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('name/:name')
  async getTypeByName(@Param('name') name: string): Promise<TypeDto> {
    try {
      return await this.typeService.getTypeByName(name);
    } catch (error) {
      throw new HttpException(
        `Type with name ${name} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  async CreateTypeDto(@Body() createTypeDto: CreateTypeDto) {
    try {
      return this.typeService.createType(createTypeDto);
    } catch (error) {
      throw new HttpException('Type not created', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  async updateType(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTypeDto: UpdateTypeDto,
  ) {
    try {
      return await this.typeService.updateType(id, updateTypeDto);
    } catch (error) {
      throw new HttpException('Type not updated', HttpStatus.BAD_REQUEST);
    }
  }
}
