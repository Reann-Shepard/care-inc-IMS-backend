import { Controller, Get } from '@nestjs/common';
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
}
