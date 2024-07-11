import { Controller, Get } from '@nestjs/common';
import { InventoryOvService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryOvService) {}

  @Get()
  getAllInventory() {
    try {
      return this.inventoryService.getAllInventory();
    } catch (error) {
      console.log(error);
    }
  }
}
