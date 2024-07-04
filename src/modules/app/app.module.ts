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
import { InventoryModule } from '../inventory/inventory.module';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { InventoryController } from '../inventory/inventory.controller';
import { InventoryService } from '../inventory/inventory.service';
// import { PackageModule } from '../package/package.module';
import { PackageController } from '../package/package.controller';
import { PackageService } from '../package/package.service';
import { ColorController } from '../color/color.controller';
import { ColorService } from '../color/color.service';
import { TypeController } from '../type/type.controller';
import { TypeService } from '../type/type.service';
import { ClientController } from '../client/client.controller';
import { ClientService } from '../client/client.service';
import { OrderCustomerController } from '../orderCustomer/orderCustomer.controller';
import { OrderCustomerService } from '../orderCustomer/orderCustomer.service';
import { OrderCustomerModule } from '../orderCustomer/orderCustomer.module';

@Module({
  imports: [
    PrismaModule,
    DeviceModule,
    ConfigModule.forRoot(),
    OrderCustomerModule,
    ManufacturerModule,
    InventoryModule,
  ],
  controllers: [
    AppController,
    DeviceController,
    ManufacturerController,
    InventoryController,
    PackageController,
    ColorController,
    TypeController,
    ClientController,
    OrderCustomerController,
  ],
  providers: [
    AppService,
    PrismaService,
    DeviceService,
    ManufacturerService,
    InventoryService,
    PackageService,
    ColorService,
    TypeService,
    ClientService,
    OrderCustomerService,
  ],
})
export class AppModule {}
