import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PackageService {
  constructor(private prisma: PrismaService) {}

  async getAllPackages() {
    return this.prisma.package.findMany();
  }

  async getAllPackagesSortedFiltered(
    sortBy: string,
    filterBy: { [key: string]: any[] } = {},
  ) {
    const filterQuery = Object.keys(filterBy).reduce((acc, key) => {
      if (filterBy[key].length > 0) {
        if (key === 'fittingDate') {
          const start = new Date(filterBy[key][0]);
          const end = new Date(filterBy[key][0]);
          end.setMonth(end.getMonth() + 1);
          acc['fittingDate'] = {
            gte: start,
            lt: end,
          };
        } else {
          acc[key] = { in: filterBy[key] };
        }
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
