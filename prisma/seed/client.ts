import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedClients() {
  const clients = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  for (const client of clients) {
    const existingClient = await prisma.client.findFirst({
      where: {
        id: client.id,
      },
    });

    if (!existingClient) {
      const newClient = await prisma.client.create({
        data: client,
      });
      console.log(`Client Created: ${newClient.id}`);
    } else {
      console.log(`Client already exists: ${client.id}`);
    }
  }
}
