import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [ConfigModule],
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService],
})
export class DeviceModule {}
