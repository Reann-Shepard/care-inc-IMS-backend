import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getAllInventory() {
    try {
      return this.inventoryService.getAllInventory();
    } catch (error) {
      console.log(error);
    }
  }
}
