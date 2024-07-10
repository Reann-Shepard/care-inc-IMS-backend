import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '@prisma/client';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAllClients() {
    try {
      return this.clientService.getAllClients();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getReparById(@Param('id') id: string): Promise<Client> {
    try {
      return this.clientService.getClientById(Number(id));
    } catch (error) {
      console.log(error);
    }
  }
}
