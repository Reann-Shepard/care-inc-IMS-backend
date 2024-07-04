import { MiddlewareConsumer, Module } from '@nestjs/common';
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
import { RepairController } from '../repair/repair.controller';
import { RepairService } from '../repair/repair.service';
import { RepairModule } from '../repair/repair.module';
import { OrderManufacturerModule } from '../order-manufacturer/order-manufacturer.module';
import { OrderManufacturerController } from '../order-manufacturer/order-manufacturer.controller';
import { OrderManufacturerService } from '../order-manufacturer/order-manufacturer.service';
import { UserModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
    }),
    PrismaModule,
    DeviceModule,
    ConfigModule.forRoot(),
    OrderCustomerModule,
    ManufacturerModule,
    InventoryModule,
    RepairModule,
    OrderManufacturerModule,
    UserModule,
    AuthModule,
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
    RepairController,
    OrderManufacturerController,
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
    RepairService,
    OrderManufacturerService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
