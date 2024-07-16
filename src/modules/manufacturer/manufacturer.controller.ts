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
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from '@prisma/client';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufacturers() {
    try {
      return this.manufacturerService.getAllManufacturers();
    } catch (error) {
      console.log(error);
      throw new HttpException('Manufacturers not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  async getManufacturerById(@Param('id') id: string): Promise<Manufacturer> {
    try {
      return this.manufacturerService.getManufacturerById(Number(id));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Manufacturer with id ${id} not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post()
  async createManufacturer(
    @Body() createManufactureDto: CreateManufacturerDto,
  ) {
    try {
      return this.manufacturerService.createManufacturer(createManufactureDto);
    } catch (error) {
      throw new HttpException(
        'Manufacturer not created',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateManufacturer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
  ) {
    try {
      return this.manufacturerService.updateManufacturer(
        id,
        updateManufacturerDto,
      );
    } catch (error) {
      throw new HttpException(
        'Manufacturer not updated',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
