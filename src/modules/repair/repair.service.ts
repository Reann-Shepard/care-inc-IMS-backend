import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RepairService {
  constructor(private prisma: PrismaService) {}

  async getAllRepairs() {
    return this.prisma.repair.findMany();
  }

  // async createRepair(clientId:number, manufacturerId, data: Prisma.RepairCreateInput){
  //   try{
  //     const client = await this.prisma.client.findUnique({
  //       where: {clientId}
  //     });
  //     const manufacturer = await this.prisma.manufacturer.findUnique({
  //       where: {manufacturerId}
  //     });

  //     if(client && manufacturer){
  //       const repair = this.prisma.repair.create({
  //         data: {
  //           ...data,
  //           client: {
  //             connect: { clientId },
  //           },
  //         }

  //       });
  //       return repair;
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
}
// }
