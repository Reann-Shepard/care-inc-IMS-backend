import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async getAllColors() {
    return this.prisma.color.findMany();
  }
}
