import { Controller, Get, Param } from '@nestjs/common';
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
      console.error(e);
    }
  }

  @Get('/:id')
  getOrderManufacturerById(@Param('id') id: number) {
    try {
      return this.orderManufacturerService.getOrderManufacturerById(Number(id));
    } catch (e) {
      console.error(e);
    }
  }
}
