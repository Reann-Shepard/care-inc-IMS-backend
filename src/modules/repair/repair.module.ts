import { Module } from '@nestjs/common';
import { RepairController } from './repair.controller';
import { RepairService } from './repair.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RepairController],
  providers: [RepairService, PrismaService],
})
export class RepairModule {}
