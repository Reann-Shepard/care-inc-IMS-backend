import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
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
    try {
      return this.deviceService.updateDevice(Number(id), updateDeviceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  createDevice(@Body() createDeviceDto: Prisma.DeviceCreateInput) {
    try {
      return this.deviceService.createDevice(createDeviceDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
