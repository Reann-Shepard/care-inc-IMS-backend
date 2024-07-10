import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  // Example. Any one can delete this
  async getAllDevices() {
    return this.prisma.device.findMany();
  }

  async checkDuplicateSerialNumber(serialNumber: string) {
    if (!serialNumber) {
      return false;
    }

    try {
      const existingDevice = await this.prisma.device.findUnique({
        where: { serialNumber },
      });
      return existingDevice !== null;
    } catch (error) {
      console.error('Error finding unique serial number:', error);
      throw new Error('Error finding unique serial number');
    }
  }
}
