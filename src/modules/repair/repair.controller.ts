import { Controller, Get, Post, Param } from '@nestjs/common';
import { RepairService } from './repair.service';
import { Repair } from '@prisma/client';

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

  @Get(':id')
  async getRepairById(@Param('id') id: string): Promise<Repair> {
    try {
      return this.repairService.getRepairById(Number(id));
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
