import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedDevices() {
  const devices = [
    {
      serialNumber: 'SN001',
      manufacturerId: 1,
      colorId: 1,
      typeId: 1,
      stockInDate: new Date('2023-01-01'),
      sellDate: new Date('2023-06-01'),
      packageId: 1,
    },
    {
      serialNumber: 'SN002',
      manufacturerId: 2,
      colorId: 2,
      typeId: 2,
      stockInDate: new Date('2023-02-01'),
      sellDate: null,
      packageId: 2,
    },
    {
      serialNumber: 'SN003',
      manufacturerId: 3,
      colorId: 3,
      typeId: 3,
      stockInDate: new Date('2023-03-01'),
      sellDate: new Date('2023-07-01'),
      packageId: 3,
    },
    {
      serialNumber: 'SN004',
      manufacturerId: 4,
      colorId: 4,
      typeId: 4,
      stockInDate: new Date('2023-04-01'),
      sellDate: null,
      packageId: 4,
    },
    {
      serialNumber: 'SN005',
      manufacturerId: 5,
      colorId: 5,
      typeId: 5,
      stockInDate: new Date('2023-05-01'),
      sellDate: null,
      packageId: 5,
    },
  ];

  for (const device of devices) {
    const existingDevice = await prisma.device.findFirst({
      where: {
        serialNumber: device.serialNumber,
      },
    });

    if (!existingDevice) {
      try {
        const newDevice = await prisma.device.create({
          data: device,
        });
        console.log(`Device Created: ${newDevice.serialNumber}`);
      } catch (error) {
        console.error(`Failed to create device ${device.serialNumber}:`, error);
      }
    } else {
      console.log(`Device already exists: ${device.serialNumber}`);
    }
  }
}
