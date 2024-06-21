import { Controller, Get } from '@nestjs/common';
import { TypeService } from './type.service';

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
}
