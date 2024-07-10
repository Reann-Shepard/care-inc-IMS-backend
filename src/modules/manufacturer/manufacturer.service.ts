import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ManufacturerService {
  constructor(private prisma: PrismaService) {}

  async getAllManufacturers() {
    return this.prisma.manufacturer.findMany();
  }

  async getThisManufacturer(id: number) {
    return this.prisma.manufacturer.findUnique({
      where: {
        id,
      },
    });
  }
}
