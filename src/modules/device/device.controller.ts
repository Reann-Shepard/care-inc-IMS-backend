import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Body,
  Param,
  Patch,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { Device, Prisma } from '@prisma/client';

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

  @Get(':id')
  async getDeviceById(@Param('id') id: string): Promise<Device> {
    try {
      return this.deviceService.getDeviceById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }

  @Patch(':id')
  updateDevice(
    @Param('id') id: string,
    @Body() updateDeviceDto: Prisma.DeviceUpdateInput,
  ) {
    return this.deviceService.updateDevice(Number(id), updateDeviceDto);
  }
}
