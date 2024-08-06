import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';

@Injectable()
export class TypeService {
  constructor(private prismaService: PrismaService) {}

  async getAllTypes() {
    return this.prismaService.type.findMany({ orderBy: { id: 'asc' } });
  }

  async getThisType(id: number) {
    return this.prismaService.type.findUnique({
      where: {
        id,
      },
    });
  }

  async getTypeByName(name: string) {
    return this.prismaService.type.findFirst({ where: { name } });
  }

  async createType(createTypeDto: CreateTypeDto) {
    return this.prismaService.type.create({
      data: createTypeDto,
    });
  }

  async updateType(id: number, updateTypeDto: UpdateTypeDto) {
    return this.prismaService.type.update({
      where: { id },
      data: updateTypeDto,
    });
  }
}
