import { Module } from '@nestjs/common';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService, PrismaService],
})
export class ManufacturerModule {}
