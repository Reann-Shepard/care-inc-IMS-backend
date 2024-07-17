import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(private prisma: PrismaService) {}

  async getAllManufacturers() {
    return this.prisma.manufacturer.findMany();
  }

  async getManufacturerById(id: number) {
    return this.prisma.manufacturer.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async createManufacturer(createManufactureDto: CreateManufacturerDto) {
    return this.prisma.manufacturer.create({
      data: createManufactureDto,
    });
  }

  async updateManufacturer(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
  ) {
    return this.prisma.manufacturer.update({
      where: { id },
      data: updateManufacturerDto,
    });
  }
}
