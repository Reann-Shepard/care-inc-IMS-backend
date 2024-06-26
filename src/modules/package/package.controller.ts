import { Controller, Get, Query } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  getAllPackages(@Query('sortBy') sortBy?: string) {
    try {
      if (sortBy) {
        return this.packageService.getPackageSortBy(sortBy);
      } else {
        return this.packageService.getAllPackages();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
