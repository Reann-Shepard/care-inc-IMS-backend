import { Controller, Get, Post } from '@nestjs/common';
import { RepairService } from './repair.service';
import { Prisma } from '@prisma/client';

@Controller('repair')
export class RepairController {
  constructor(private repairService: RepairService) {}

  @Get()
  getAllRepairs() {
    try {
      return this.repairService.getAllRepairs();
    } catch (error) {
      console.log(error);
    }
  }

  // @Post()
  // createRepair(data: Prisma.RepairCreateInput) {
  //   try {
  //     return this.repairService.createRepair(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
