import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedManufacturers() {
  const manufacturers = [
    { id: 1, name: 'Unitron' },
    { id: 2, name: 'Unitron S' },
    { id: 3, name: 'Signia CG' },
    { id: 4, name: 'Signia Silk' },
    { id: 5, name: 'Oticon' },
  ];

  for (const manufacturer of manufacturers) {
    await prisma.manufacturer.upsert({
      where: { id: manufacturer.id },
      update: { name: manufacturer.name },
      create: manufacturer,
    });
    console.log(`Manufacturer upserted: ${manufacturer.name}`);
  }
}
