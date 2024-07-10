import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
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
    return this.deviceService.updateDevice(Number(id), updateDeviceDto);
  }
}
