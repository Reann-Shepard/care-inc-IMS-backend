import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async getAllPackages() {
    return this.prisma.package.findMany();
  }
}
