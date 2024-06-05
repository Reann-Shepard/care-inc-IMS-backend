import { Controller, Get } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';

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
}
