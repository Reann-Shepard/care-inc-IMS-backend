import { Controller, Get } from '@nestjs/common';
import { OrderCustomerService } from './orderCustomer.service';

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
}
