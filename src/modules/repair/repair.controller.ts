import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { RepairService } from './repair.service';
import { Repair } from '@prisma/client';
import { CreateRepairDto } from './dtos/createRepair.dto';

@Controller('repair')
export class RepairController {
  constructor(private readonly repairService: RepairService) {}

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

  @Post()
  @UsePipes(ValidationPipe)
  async createRepair(@Body() createRepairDto: CreateRepairDto) {
    try {
      return await this.repairService.createRepair(createRepairDto);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to create repair');
    }
  }
}
