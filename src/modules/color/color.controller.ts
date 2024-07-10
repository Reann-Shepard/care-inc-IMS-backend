import { Controller, Get, Param } from '@nestjs/common';
import { ColorService } from './color.service';
import { Color } from '@prisma/client';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  getAllColors() {
    try {
      return this.colorService.getAllColors();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getColorById(@Param('id') id: string): Promise<Color> {
    try {
      return this.colorService.getColorById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }
}
