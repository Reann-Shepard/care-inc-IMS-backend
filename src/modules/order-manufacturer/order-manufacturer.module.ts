import { Module } from '@nestjs/common';
import { OrderManufacturerController } from './order-manufacturer.controller';
import { OrderManufacturerService } from './order-manufacturer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OrderManufacturerController],
  providers: [OrderManufacturerService, PrismaService],
})
export class OrderManufacturerModule {}
