import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DeviceModule } from '../device/device.module';
import { DeviceController } from '../device/device.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceService } from '../device/device.service';
import { ConfigModule } from '@nestjs/config';
import { ManufacturerController } from '../manufacturer/manufacturer.controller';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { PackageController } from '../package/package.controller';
import { PackageService } from '../package/package.service';

@Module({
  imports: [PrismaModule, DeviceModule, ConfigModule.forRoot()],
  controllers: [
    AppController,
    DeviceController,
    ManufacturerController,
    PackageController,
  ],
  providers: [
    AppService,
    PrismaService,
    DeviceService,
    ManufacturerService,
    PackageService,
  ],
})
export class AppModule {}
