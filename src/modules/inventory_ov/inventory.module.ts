import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryOvService } from './inventory.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryOvService, PrismaService],
})
export class InventoryModule {}
