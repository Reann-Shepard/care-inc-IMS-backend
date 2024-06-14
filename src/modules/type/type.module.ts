import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TypeController],
  providers: [TypeService, PrismaService],
})
export class TypeModule {}
