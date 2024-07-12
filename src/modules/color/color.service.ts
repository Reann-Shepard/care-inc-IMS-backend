import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateColorDto } from './dto/create-color.dto';
import { ColorDto } from './dto/color.dto';
import { UpdateColorDto } from './dto/update-color.dto';

@Injectable()
export class ColorService {
  constructor(private prismaService: PrismaService) {}

  async getAllColors() {
    return this.prismaService.color.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async getColorById(id: number): Promise<ColorDto> {
    return this.prismaService.color.findUnique({ where: { id } });
  }

  async getColorByName(name: string): Promise<ColorDto> {
    return this.prismaService.color.findFirst({ where: { name } });
  }

  async createColor(createColorDto: CreateColorDto) {
    return this.prismaService.color.create({
      data: { name: createColorDto.name },
    });
  }

  async updateColor(id: number, updatedColorDto: UpdateColorDto) {
    return this.prismaService.color.update({
      where: { id },
      data: updatedColorDto,
    });
  }

  async deleteColor(id: number) {
    return this.prismaService.color.delete({ where: { id } });
  }
}
