import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

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

    const packageCounts = result.reduce((acc, pkg) => {
      const manufacturer = pkg.devices[0].manufacturer.name;

      if (acc[manufacturer]) {
        acc[manufacturer]++;
      } else {
        acc[manufacturer] = 1;
      }

      return acc;
    }, {});

    return Object.entries(packageCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

  async getAlterationCountByMfr() {
    const result = await this.prisma.repair.groupBy({
      by: ['manufacturerId'],
      _count: {
        manufacturerId: true,
      },
    });

    const alterationCounts = await Promise.all(
      result.map(async (repair) => {
        const manufacturer = await this.prisma.manufacturer.findUnique({
          where: { id: repair.manufacturerId },
        });

        return {
          name: manufacturer.name,
          count: repair._count.manufacturerId,
        };
      }),
    );

    return alterationCounts;
  }

  async addInventory(createInventoryDto: CreateInventoryDto) {
    const newDevice = await this.prisma.device.create({
      data: {
        serialNumber: createInventoryDto.serialNumber,
        stockInDate: new Date(createInventoryDto.stockInDate),
        sellDate: createInventoryDto.sellDate
          ? new Date(createInventoryDto.sellDate)
          : null,
        color: {
          connect: { name: createInventoryDto.color },
        },
        manufacturer: {
          connect: { name: createInventoryDto.manufacturer },
        },
        type: {
          connect: { name: createInventoryDto.type },
        },
      },
    });
    return newDevice;
  }
}
