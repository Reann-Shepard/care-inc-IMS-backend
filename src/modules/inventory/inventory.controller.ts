import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateInventoryDto } from './dto/create-inventory.dto'; // Import the CreateInventoryDto, will be used to validate the request body when adding a new device to the inventory.

@Controller('inventory') // Set the base path for the InventoryController. All routes in this controller will be prefixed with /inventory.
export class InventoryController {
  // Inject the InventoryService into the InventoryController.
  // This will allow the controller to use the methods defined in the service.
  constructor(private readonly inventoryService: InventoryService) {}

  // Endpoint to get the current count of devices in inventory that haven't been sold.
  @Get('count')
  async getCurrentInventoryCount() {
    const count = await this.inventoryService.getCurrentInventoryCount();
    return { count };
  }

  // Endpoint to get details of devices currently in inventory that haven't been sold.
  @Get('list')
  async getCurrentInventory() {
    const devices = await this.inventoryService.getCurrentInventory();
    return devices;
  }

  // Endpoint to get the count of devices in inventory grouped by manufacturer.
  @Get('count-device')
  async getDeviceCountByMfr() {
    const deviceCount = await this.inventoryService.getDeviceCountByMfr();
    return deviceCount;
  }

  // Endpoint to get the count of packages in inventory grouped by manufacturer.
  @Get('count-package')
  async getPackageCountByMfr() {
    const packageCount = await this.inventoryService.getPackageCountByMfr();
    return packageCount;
  }

  // Endpoint to get the count of alterations in inventory grouped by manufacturer.
  @Get('count-alteration')
  async getAlterationCountByMfr() {
    const alterationCount =
      await this.inventoryService.getAlterationCountByMfr();
    return alterationCount;
  }

  // Endpoint to add a new device to the inventory.
  @Post('add_inventory')
  async addInventory(@Body() createInventoryDto: CreateInventoryDto) {
    try {
      const newDevice =
        await this.inventoryService.addInventory(createInventoryDto);
      return { message: 'Device added successfully', newDevice };
    } catch (error) {
      throw new HttpException(
        'Error adding inventory',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
