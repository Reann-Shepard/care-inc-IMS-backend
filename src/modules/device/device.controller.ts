import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  getAllDevices() {
    try {
      return this.deviceService.getAllDevices();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('check-serial-number')
  async checkSerialNumber(@Query('serialNumber') serialNumber: string) {
    if (!serialNumber) {
      throw new BadRequestException('Serial Number must be provided');
    }
    const isDuplicate =
      await this.deviceService.checkDuplicateSerialNumber(serialNumber);
    if (isDuplicate) {
      throw new BadRequestException('Serial Number already exists');
    }
    return { message: 'Serial Number is unique' };
  }
}
