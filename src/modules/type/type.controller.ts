import { Controller, Get, Param } from '@nestjs/common';
import { TypeService } from './type.service';
import { Type } from '@prisma/client';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  getAllTypes() {
    try {
      return this.typeService.getAllTypes();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getThisType(@Param('id') id: string): Promise<Type> {
    try {
      return this.typeService.getThisType(Number(id));
    } catch (error) {
      console.log(error);
    }
  }
}
