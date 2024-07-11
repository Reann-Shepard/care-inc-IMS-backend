import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { Package, Prisma } from '@prisma/client';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}
  @Get()
  getAllPackages() {
    return this.packageService.getAllPackages();
  }

  @Get('sorted-filtered')
  getAllPackagesSortedFiltered(
    @Query() query: { [key: string]: string | string[] },
  ) {
    const { sortBy, ...filterBy } = query;
    const filter = {};

    if (filterBy.packageId) {
      filter['id'] = Array.isArray(filterBy.packageId)
        ? filterBy.packageId.map((id) => +id)
        : [+filterBy.packageId];
    }
    if (filterBy.clientId) {
      filter['clientId'] = Array.isArray(filterBy.clientId)
        ? filterBy.clientId.map((id) => +id)
        : [+filterBy.clientId];
    }
    // if (filterBy.fittingDate) {
    //   filter['fittingDate'] = Array.isArray(filterBy.fittingDate)
    //     ? filterBy.fittingDate.map((date) => date.slice(0, 7))
    //     : [+filterBy.fittingDate.slice(0, 7)];
    // }

    try {
      const sortCon = Array.isArray(sortBy) ? sortBy[0] : sortBy || 'id';
      return this.packageService.getAllPackagesSortedFiltered(sortCon, filter);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  getPackageById(@Param('id') id: string): Promise<Package> {
    try {
      return this.packageService.getPackageById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }

  @Post()
  createPackage(@Body() createPackageDto: Prisma.PackageCreateInput) {
    return this.packageService.createPackage(createPackageDto);
  }

  @Patch(':id')
  updatePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: Prisma.PackageUpdateInput,
  ) {
    return this.packageService.updatePackage(Number(id), updatePackageDto);
  }
}
