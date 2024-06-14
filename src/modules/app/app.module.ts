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
import { ColorController } from '../color/color.controller';
import { ColorService } from '../color/color.service';
import { TypeController } from '../type/type.controller';
import { TypeService } from '../type/type.service';
import { ClientController } from '../client/client.controller';
import { ClientService } from '../client/client.service';

@Module({
  imports: [PrismaModule, DeviceModule, ConfigModule.forRoot()],
  controllers: [
    AppController,
    DeviceController,
    ManufacturerController,
    PackageController,
    ColorController,
    TypeController,
    ClientController,
  ],
  providers: [
    AppService,
    PrismaService,
    DeviceService,
    ManufacturerService,
    PackageService,
    ColorService,
    TypeService,
    ClientService,
  ],
})
export class AppModule {}
