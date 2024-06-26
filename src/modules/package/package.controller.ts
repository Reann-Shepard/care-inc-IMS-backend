import { Controller, Get, Query } from '@nestjs/common';
import { PackageService } from './package.service';

@Controller('package')
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @Get()
  getAllPackages(@Query() query: { [key: string]: string | string[] }) {
    const { sortBy, ...filterBy } = query;
    const filter = {};
    // let filter: { [key: string]: any[] } = {};

    // if (filterBy.packageId || filterBy.clientId) {
    //   const filterCondition = [];

    //   if (filterBy.packageId) {
    //     filter['id'] = Array.isArray(filterBy.packageId)
    //       ? filterBy.packageId.map((id) => +id)
    //       : [+filterBy.packageId];
    //     filterCondition.push({ id: { in: filter['id'] } });
    //   }
    //   if (filterBy.clientId) {
    //     filter['clientId'] = Array.isArray(filterBy.clientId)
    //       ? filterBy.clientId.map((id) => +id)
    //       : [+filterBy.clientId];
    //     filterCondition.push({ clientId: { in: filter['clientId'] } });
    //   }
    //   filter = {
    //     OR: filterCondition,
    //   };
    // }

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
      return this.packageService.getAllPackages(sortCon, filter);
    } catch (error) {
      console.log(error);
    }
  }
}
