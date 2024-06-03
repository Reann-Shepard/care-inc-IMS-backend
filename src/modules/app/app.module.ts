import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { DeviceModule } from '../device/device.module';
import { DeviceController } from '../device/device.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DeviceService } from '../device/device.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule, DeviceModule, ConfigModule.forRoot()],
  controllers: [AppController, DeviceController],
  providers: [AppService, PrismaService, DeviceService],
})
export class AppModule {}
