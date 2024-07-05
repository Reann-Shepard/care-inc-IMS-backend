import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateRepairDto } from './dtos/createRepair.dto';

@Injectable()
export class RepairService {
  constructor(private prisma: PrismaService) {}

  async getAllRepairs() {
    return this.prisma.repair.findMany();
  }

  async getRepairById(id: number) {
    return this.prisma.repair.findUnique({
      where: { id: Number(id) },
    });
  }

  async createRepair(data: CreateRepairDto) {
    try {
      const repair = this.prisma.repair.create({
        data: {
          ...data,
          client: {
            connect: { id: data.client },
          },
          manufacturer: {
            connect: { id: data.manufacturer },
          },
          repairDevices: {
            create: data.repairDevices.map((device) => ({
              device: { connect: { id: device } },
            })),
          },
        },
        include: { repairDevices: true },
      });
      return repair;
    } catch (error) {
      console.log(error);
      console.error('Error creating repair:', error); // Log the error
      throw new BadRequestException('Failed to create repair');
    }
  }
}
