import { Controller, Get } from '@nestjs/common';
import { ColorService } from './color.service';

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
}
