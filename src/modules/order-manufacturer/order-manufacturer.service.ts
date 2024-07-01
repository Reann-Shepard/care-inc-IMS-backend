import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrderManufacturerService {
  constructor(private prisma: PrismaService) {}

  async getAllOrderManufacturer() {
    return this.prisma.orderManufacturer.findMany({
      select: {
        id: true,
        amount: true,
        orderDate: true,
        OrderDevices: {
          select: {
            device: {
              select: {
                color: true,
                type: true,
                manufacturer: true,
              },
            },
          },
        },
      },
    });
  }

  async getOrderManufacturerById(id: number) {
    return this.prisma.orderManufacturer.findUnique({
      where: { id },
      select: {
        id: true,
        amount: true,
        orderDate: true,
        OrderDevices: {
          select: {
            device: {
              select: {
                color: true,
                type: true,
                manufacturer: true,
              },
            },
          },
        },
      },
    });
  }
}
