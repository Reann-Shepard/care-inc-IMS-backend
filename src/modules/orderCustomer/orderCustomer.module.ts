import { Module } from '@nestjs/common';
import { OrderCustomerController } from './orderCustomer.controller';
import { OrderCustomerService } from './orderCustomer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [OrderCustomerController],
  providers: [OrderCustomerService, PrismaService],
})
export class OrderCustomerModule {}
