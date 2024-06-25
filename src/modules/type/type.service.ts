import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private prisma: PrismaService) {}

  async getAllTypes() {
    return this.prisma.type.findMany();
  }

  async getThisType(id: number) {
    return this.prisma.type.findUnique({
      where: {
        id,
      },
    });
  }
}
