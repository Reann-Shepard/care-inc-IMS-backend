import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  /**
   * Retrieves the current count of devices in inventory that haven't been sold.
   *
   * @returns Promise<number> - Number of devices in current inventory.
   */

  async getCurrentInventoryCount(): Promise<number> {
    const count = await this.prisma.device.count({
      where: {
        sellDate: null,
      },
    });
    return count;
  }

  /**
   * Retrieves details of devices currently in inventory that haven't been sold.
   * Includes device ID, serial number, and manufacturer name.
   *
   * @returns Promise<{ id: number; serialNumber: string; name: string }[]> - Array of devices in inventory.
   */

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

  /**
   * Retrieves the count of devices grouped by manufacturer.
   *
   * @returns Promise<{ name: string; count: number }[]> - Array of objects containing manufacturer names and their device counts.
   */

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

  /**
   * Retrieves the count of packages by manufacturer based on connected devices.
   *
   * @returns Promise<{ name: string; count: number }[]> - Array of objects containing manufacturer names and their package counts.
   */

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
      if (pkg.devices.length > 0 && pkg.devices[0].manufacturer) {
        const manufacturer = pkg.devices[0].manufacturer.name;

        if (acc[manufacturer]) {
          acc[manufacturer]++;
        } else {
          acc[manufacturer] = 1;
        }
      }

      return acc;
    }, {});

    return Object.entries(packageCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }

  /**
   * Retrieves the count of alterations (repairs) by manufacturer.
   *
   * @returns Promise<{ name: string; count: number }[]> - Array of objects containing manufacturer names and their alteration counts.
   */
  async getAlterationCountByMfr(): Promise<{ name: string; count: number }[]> {
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

  /**
   * Adds a new device inventory record.
   *
   * @param createInventoryDto - DTO containing data to create a new inventory record.
   * @returns Promise<any> - The newly created device inventory record.
   */

  async addInventory(createInventoryDto: CreateInventoryDto) {
    const newDevice = await this.prisma.device.create({
      data: {
        serialNumber: createInventoryDto.serialNumber,
        stockInDate: new Date(createInventoryDto.stockInDate),
        sellDate: createInventoryDto.sellDate
          ? new Date(createInventoryDto.sellDate)
          : null,
        color: {
          connect: { id: createInventoryDto.color },
        },
        manufacturer: {
          connect: { id: createInventoryDto.manufacturerId },
        },
        type: {
          connect: { id: createInventoryDto.typeId },
        },
      },
    });
    return newDevice;
  }
}
