import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getAllClients() {
    return this.prisma.client.findMany();
  }

  async getClientById(id: number) {
    return this.prisma.client.findUnique({
      where: {
        id: Number(id),
      },
    });
  }
}
