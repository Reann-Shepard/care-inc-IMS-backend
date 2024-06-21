import { Module } from '@nestjs/common';
import { PackageController } from './package.controller';
import { PackageService } from './package.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PackageController],
  providers: [PackageService, PrismaService],
})
export class PackageModule {}
