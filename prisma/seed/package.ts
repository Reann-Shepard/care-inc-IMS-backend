import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedPackages() {
  const packages = [
    {
      clientId: 1,
      fittingDate: new Date('2024-01-01'),
      warrantyExpiration: new Date('2025-01-01'),
      orderCustomerId: 1,
    },
    {
      clientId: 2,
      fittingDate: new Date('2024-02-01'),
      warrantyExpiration: new Date('2025-02-01'),
      orderCustomerId: 2,
    },
    {
      clientId: 3,
      fittingDate: new Date('2024-03-01'),
      warrantyExpiration: new Date('2025-03-01'),
      orderCustomerId: 3,
    },
    {
      clientId: 4,
      fittingDate: new Date('2024-04-01'),
      warrantyExpiration: new Date('2025-04-01'),
      orderCustomerId: 4,
    },
    {
      clientId: 5,
      fittingDate: new Date('2024-05-01'),
      warrantyExpiration: new Date('2025-05-01'),
      orderCustomerId: 5,
    },
  ];

  for (const packageData of packages) {
    const existingPackage = await prisma.package.findFirst({
      where: {
        clientId: packageData.clientId,
        fittingDate: packageData.fittingDate,
      },
    });

    if (!existingPackage) {
      try {
        const newPackage = await prisma.package.create({
          data: packageData,
        });
        console.log(`Package Created: ${newPackage.id}`);
      } catch (error) {
        console.error(
          `Failed to create package for clientId: ${packageData.clientId}, fittingDate: ${packageData.fittingDate}`,
          error,
        );
      }
    } else {
      console.log(
        `Package already exists for clientId: ${packageData.clientId} and fittingDate: ${packageData.fittingDate}`,
      );
    }
  }
}
