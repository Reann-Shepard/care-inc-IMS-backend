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
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { ColorDto } from './dto/color.dto';
import { Roles } from 'src/middleware/roles.decorator';
import { Role } from '@prisma/client';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  getAllColors() {
    try {
      return this.colorService.getAllColors();
    } catch (error) {
      throw new HttpException('Colors not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getColorById(@Param('id', ParseIntPipe) id: number): Promise<ColorDto> {
    try {
      return await this.colorService.getColorById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        `Color with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('name/:name')
  async getColorByName(@Param('name') name: string): Promise<ColorDto> {
    try {
      return await this.colorService.getColorByName(name);
    } catch (error) {
      throw new HttpException(
        `Color with name ${name} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  async createColor(@Body() createColorDto: CreateColorDto) {
    try {
      return this.colorService.createColor(createColorDto);
    } catch (error) {
      throw new HttpException('Color not created', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  async updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateColorDto: UpdateColorDto,
  ) {
    try {
      return this.colorService.updateColor(id, updateColorDto);
    } catch (error) {
      throw new HttpException('Color not updated', HttpStatus.BAD_REQUEST);
    }
  }
}
