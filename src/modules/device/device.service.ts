import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

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

  async getDeviceById(id: number) {
    return this.prisma.device.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async updateDevice(id: number, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({
      where: {
        id: id,
      },
      data: updateDeviceDto,
    });
  }

  async removeDevicePackageId(id: number) {
    return this.prisma.device.update({
      where: { id: id },
      data: { packageId: null },
    });
  }
}
