import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { OrderManufacturerService } from './order-manufacturer.service';
import { UpdateOrderManufacturerDto } from './dto/update-order-manufacturer.dto';
import { PostOrderManufacturerDto } from './dto/post-order-manufacturer.dto';

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

  @Patch('/:id')
  updateOrderManufacturerById(
    @Param('id') id: number,
    @Body() updateOrderManufacturerDto: UpdateOrderManufacturerDto,
  ) {
    return this.orderManufacturerService.updateOrderManufacturerById(
      id,
      updateOrderManufacturerDto,
    );
  }

  @Post()
  postOrderManufacturer(
    @Body() postOrderManufacturerDto: PostOrderManufacturerDto,
  ) {
    return this.orderManufacturerService.postOrderManufacturer(
      postOrderManufacturerDto,
    );
  }
}
