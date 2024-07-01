import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderManufacturerService {
  constructor(private prisma: PrismaService) {}

  async getAllOrderManufacturer() {
    return this.prisma.orderManufacturer.findMany();
  }
}
