import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getCurrentInventoryCount(): Promise<number> {
    const count = await this.prisma.device.count({
      where: {
        sellDate: null,
      },
    });
    return count;
  }

  async getCurrentInventory(): Promise<
    { id: number; serialNumber: string; name: string }[]
  > {
    const devices = await this.prisma.device.findMany({
      where: {
        sellDate: null,
      },
      select: {
        id: true,
        serialNumber: true,
        manufacturer: {
          select: {
            name: true,
          },
        },
      },
    });

    return devices.map((device) => ({
      id: device.id,
      serialNumber: device.serialNumber,
      name: device.manufacturer.name,
    }));
  }

  async getDeviceCountByMfr(): Promise<{ name: string; count: number }[]> {
    const devices = await this.prisma.device.groupBy({
      by: ['manufacturerId'],
      where: {
        sellDate: null,
      },
      _count: {
        id: true,
      },
    });

    const result = await Promise.all(
      devices.map(async (device) => {
        const manufacturer = await this.prisma.manufacturer.findUnique({
          where: { id: device.manufacturerId },
        });

        return {
          name: manufacturer.name,
          count: device._count.id,
        };
      }),
    );

    return result;
  }

  async getPackageCountByMfr() {
    const result = await this.prisma.package.findMany({
      select: {
        devices: {
          select: {
            manufacturer: true,
          },
        },
      },
    });

    const pakageCounts = result.reduce((acc, pkg) => {
      const manufacturer = pkg.devices[0].manufacturer.name;

      if (acc[manufacturer]) {
        acc[manufacturer]++;
      } else {
        acc[manufacturer] = 1;
      }

      return acc;
    }, {});

    return Object.entries(pakageCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }
}