import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { PackageService } from './package.service';
import { Package, Prisma } from '@prisma/client';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}
  @Get()
  getAllPackages() {
    try {
      return this.packageService.getAllPackages();
    } catch (error) {
      // throw new HttpException(error.message, error.status);
      throw Error(error);
    }
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

    try {
      const sortCon = Array.isArray(sortBy) ? sortBy[0] : sortBy || 'id';
      return this.packageService.getAllPackagesSortedFiltered(sortCon, filter);
    } catch (error) {
      // throw new HttpException(error.message, error.status);
      throw Error(error);
    }
  }

  @Get(':id')
  getPackageById(@Param('id') id: string): Promise<Package> {
    try {
      return this.packageService.getPackageById(Number(id));
    } catch (error) {
      // throw new HttpException(error.message, error.status);
      throw Error(error);
    }
  }

  @Post()
  createPackage(@Body() createPackageDto: Prisma.PackageCreateInput) {
    try {
      return this.packageService.createPackage(createPackageDto);
    } catch (error) {
      // throw new HttpException(error.message, error.status);
      throw Error(error);
    }
  }

  @Patch(':id')
  updatePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: Prisma.PackageUpdateInput,
  ) {
    try {
      return this.packageService.updatePackage(Number(id), updatePackageDto);
    } catch (error) {
      // throw new HttpException(error.message, error.status);
      throw Error(error);
    }
  }

  @Patch(':id/remove-client-info')
  removePackageClientInfo(@Param('id') id: number) {
    try {
      return this.packageService.removePackageClientInfo(Number(id));
    } catch (error) {
      throw Error(error);
    }
  }

  @Delete(':id')
  deletePackage(@Param('id') id: string) {
    try {
      return this.packageService.deletePackage(Number(id));
    } catch (error) {
      throw Error(error);
    }
  }
}
