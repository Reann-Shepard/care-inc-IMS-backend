import { Controller, Get } from '@nestjs/common';
import { OrderManufacturerService } from './order-manufacturer.service';

@Controller('order-manufacturer')
export class OrderManufacturerController {
  constructor(
    private readonly orderManufacturerService: OrderManufacturerService,
  ) {}

  @Get()
  getAllOrderManufacturer() {
    try {
      return this.orderManufacturerService.getAllOrderManufacturer();
    } catch (e) {
      console.log(e);
    }
  }
}
