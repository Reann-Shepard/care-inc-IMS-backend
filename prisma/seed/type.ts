import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedTypes() {
  const types = [
    { id: 1, name: 'Hearing Aid Left' },
    { id: 2, name: 'Hearing Aid Right' },
    { id: 3, name: 'Ear Mold' },
    { id: 4, name: 'Controller' },
    { id: 5, name: 'Charger' },
  ];

  for (const type of types) {
    const existingType = await prisma.type.findFirst({
      where: {
        id: type.id,
      },
    });

    if (!existingType) {
      const newType = await prisma.type.create({
        data: type,
      });
      console.log(`Type Created: ${newType.name}`);
    } else {
      console.log(`Type already exists: ${type.name}`);
    }
  }
}
