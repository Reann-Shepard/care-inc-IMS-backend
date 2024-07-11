import { Controller, Get, Param } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from '@prisma/client';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufacturers() {
    try {
      return this.manufacturerService.getAllManufacturers();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getManufacturerById(@Param('id') id: string): Promise<Manufacturer> {
    try {
      return this.manufacturerService.getManufacturerById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }
}
