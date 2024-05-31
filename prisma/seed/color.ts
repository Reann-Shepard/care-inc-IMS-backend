import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedColors() {
  const colors = [
    { id: 1, name: 'Silver' },
    { id: 2, name: 'Chroma Beige' },
    { id: 3, name: 'Silver Grey' },
    { id: 4, name: 'Steel Grey' },
    { id: 5, name: 'Sand' },
    { id: 6, name: 'Platinum' },
    { id: 7, name: 'Charcoal' },
    { id: 8, name: 'Black' },
    { id: 9, name: 'Graphite' },
    { id: 10, name: 'Dk Champagne' },
    { id: 11, name: 'Beige' },
  ];

  for (const color of colors) {
    const existingColor = await prisma.color.findFirst({
      where: {
        name: color.name,
      },
    });

    if (!existingColor) {
      const newColor = await prisma.color.create({
        data: color,
      });
      console.log(`Color Created: ${newColor.name}`);
    } else {
      console.log(`Color already exists: ${color.name}`);
    }
  }
}
