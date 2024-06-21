import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ColorController],
  providers: [ColorService, PrismaService],
})
export class ColorModule {}
