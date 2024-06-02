import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRepairs() {
  const repairs = [
    {
      clientId: 1,
      manufacturerId: 1,
      reason: 'battery not charging',
      shippingDate: new Date('2024-04-16'),
      shipId: 'ND6BEF22VMD6DRL5W0B3',
      receivedDate: null,
    },
    {
      clientId: 2,
      manufacturerId: 2,
      reason: 'Faceplate is broken',
      shippingDate: new Date('2024-05-09'),
      shipId: 'ND2HRQ12VNAM2BN2R1A7',
      receivedDate: null,
    },
  ];

  for (const repair of repairs) {
    const existingRepair = await prisma.repair.findFirst({
      where: {
        clientId: repair.clientId,
        manufacturerId: repair.manufacturerId,
        shipId: repair.shipId,
      },
    });

    if (!existingRepair) {
      const newRepair = await prisma.repair.create({
        data: repair,
      });
      console.log(`Repair Created: ${newRepair.id}`);
    } else {
      console.log(
        `Repair already exists for clientId: ${repair.clientId}, manufacturerId: ${repair.manufacturerId}, shipId: ${repair.shipId}`,
      );
    }
  }
}
