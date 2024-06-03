import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  // Example. Any one can delete this
  async getAllDevices() {
    return this.prisma.device.findMany();
  }
}
