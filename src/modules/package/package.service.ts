import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async getAllPackages(
    sortBy: string,
    filterBy: { [key: string]: any[] } = {},
  ) {
    const filterQuery = Object.keys(filterBy).reduce((acc, key) => {
      if (filterBy[key].length > 0) {
        acc[key] = { in: filterBy[key] };
      }
      return acc;
    }, {} as any);
    return this.prisma.package.findMany({
      where: filterQuery,
      orderBy: {
        [sortBy]: 'asc',
      },
    });
  }
}
