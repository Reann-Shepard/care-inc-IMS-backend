import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async getAllDevices() {
    return this.prisma.device.findMany();
  }

  async getDeviceById(id: number) {
    return this.prisma.device.findUnique({
      where: { id: Number(id) },
    });
  }
}
