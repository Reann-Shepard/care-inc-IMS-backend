import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryOvService {
  constructor(private prisma: PrismaService) {}

  async getAllInventory() {
    return this.prisma.device.findMany();
  }
}
