import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('count')
  async getCurrentInventoryCount() {
    const count = await this.inventoryService.getCurrentInventoryCount();
    return { count };
  }

  @Get('list')
  async getCurrentInventory() {
    const devices = await this.inventoryService.getCurrentInventory();
    return devices;
  }

  @Get('count-device')
  async getDeviceCountByMfr() {
    const deviceCount = await this.inventoryService.getDeviceCountByMfr();
    return deviceCount;
  }

  @Get('count-package')
  async getPackageCountByMfr() {
    const packageCount = await this.inventoryService.getPackageCountByMfr();
    return packageCount;
  }

  @Get('count-alteration')
  async getAlterationCountByMfr() {
    const alterationCount =
      await this.inventoryService.getAlterationCountByMfr();
    return alterationCount;
  }
}
