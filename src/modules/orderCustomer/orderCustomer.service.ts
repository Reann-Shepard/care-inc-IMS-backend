import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderCustomerService {
  constructor(private prisma: PrismaService) {}

  async getAllOrderCustomers() {
    return this.prisma.orderCustomer.findMany();
  }

  async getOrderCustomerById(id: number) {
    return this.prisma.orderCustomer.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
