import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
        acc[key] = { in: filterBy[key] };
        // if (key === 'fittingDate') {
        //   const start = new Date(filterBy[key][0]);
        //   const end = new Date(filterBy[key][0]);
        //   end.setMonth(end.getMonth() + 1);
        //   acc['fittingDate'] = {
        //     gte: start,
        //     lt: end,
        //   };
        // } else {
        //   acc[key] = { in: filterBy[key] };
        // }
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

  async getPackageById(id: number) {
    return this.prisma.package.findUnique({
      where: {
        id: id,
      },
    });
  }

  async createPackage(createPackageDto: Prisma.PackageCreateInput) {
    return this.prisma.package.create({
      data: createPackageDto,
    });
  }

  async updatePackage(id: number, updatePackageDto: Prisma.PackageUpdateInput) {
    return this.prisma.package.update({
      where: {
        id: id,
      },
      data: updatePackageDto,
    });
  }

  async removePackageClientInfo(id: number) {
    return this.prisma.package.update({
      where: { id: id },
      data: {
        clientId: null,
        fittingDate: null,
        warrantyExpiration: null,
        comments: null,
      },
    });
  }

  async deletePackage(id: number) {
    return this.prisma.package.delete({
      where: { id: id },
    });
  }
}
