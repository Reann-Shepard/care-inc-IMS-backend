import { Controller, Get, Param } from '@nestjs/common';
import { OrderCustomerService } from './orderCustomer.service';
import { OrderCustomer } from '@prisma/client';

@Controller('orderCustomer')
export class OrderCustomerController {
  constructor(private readonly orderCustomerService: OrderCustomerService) {}

  @Get()
  getAllOrderCustomers() {
    try {
      return this.orderCustomerService.getAllOrderCustomers();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getOrderCustomerById(@Param('id') id: string): Promise<OrderCustomer> {
    try {
      return this.orderCustomerService.getOrderCustomerById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }
}
