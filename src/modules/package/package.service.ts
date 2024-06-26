import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async getAllPackages() {
    return this.prisma.package.findMany();
  }

  async getPackageSortBy(sortBy: string) {
    return this.prisma.package.findMany({
      orderBy: {
        [sortBy]: 'asc',
      },
    });
  }
}
