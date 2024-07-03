import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { OrderManufacturerService } from './order-manufacturer.service';
import { UpdateManufacturerDto } from '../manufacturer/dto/manufacturer.dto';

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

  @Patch(':id')
  async updateManufacturer(
    @Param('id') id: number,
    @Body() updateData: UpdateManufacturerDto,
  ) {
    try {
      return await this.orderManufacturerService.updateManufacturer(
        id,
        updateData,
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
