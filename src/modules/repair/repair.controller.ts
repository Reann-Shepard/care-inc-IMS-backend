import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { RepairService } from './repair.service';
import { Repair } from '@prisma/client';
import { CreateRepairDto } from './dtos/createRepair.dto';
import { UpdateRepairDto } from './dtos/updateRepair.dto';

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

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateRepairDto,
  ) {
    return this.repairService.updateRepair(id, updateUserDto);
  }
}
