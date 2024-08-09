import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedDevices() {
  const devices = [
    {
      serialNumber: '2338N3D7V',
      manufacturerId: 2,
      colorId: 7,
      typeId: 1,
      stockInDate: new Date('2023-01-01'),
      sellDate: new Date('2023-06-01'),
      packageId: 1,
    },
    {
      serialNumber: '2332N1RVT',
      manufacturerId: 2,
      colorId: 7,
      typeId: 2,
      stockInDate: new Date('2023-01-01'),
      sellDate: new Date('2023-06-01'),
      packageId: 1,
    },
    {
      serialNumber: '2416F4021R',
      manufacturerId: 2,
      colorId: 7,
      typeId: 4,
      stockInDate: new Date('2023-01-01'),
      sellDate: new Date('2023-06-01'),
      packageId: 1,
    },
    {
      serialNumber: '2330NY5EP',
      manufacturerId: 2,
      colorId: 7,
      typeId: 5,
      stockInDate: new Date('2023-01-01'),
      sellDate: new Date('2023-06-01'),
      packageId: 1,
    },
    //
    {
      serialNumber: '2420N219X',
      manufacturerId: 1,
      colorId: 6,
      typeId: 1,
      stockInDate: new Date('2023-10-01'),
      sellDate: new Date('2023-11-01'),
      packageId: 2,
    },
    {
      serialNumber: '2420N219U',
      manufacturerId: 1,
      colorId: 6,
      typeId: 2,
      stockInDate: new Date('2023-10-01'),
      sellDate: new Date('2023-11-01'),
      packageId: 2,
    },
    {
      serialNumber: '2409F401AT',
      manufacturerId: 1,
      colorId: 6,
      typeId: 4,
      stockInDate: new Date('2023-10-01'),
      sellDate: new Date('2023-11-01'),
      packageId: 2,
    },
    {
      serialNumber: '2412YC2RT',
      manufacturerId: 1,
      colorId: 6,
      typeId: 5,
      stockInDate: new Date('2023-10-01'),
      sellDate: new Date('2023-11-01'),
      packageId: 2,
    },
    //
    {
      serialNumber: 'BFF4169',
      manufacturerId: 3,
      colorId: 10,
      typeId: 1,
      stockInDate: new Date('2023-12-01'),
      sellDate: new Date('2024-01-10'),
      packageId: 3,
    },
    {
      serialNumber: 'NGE1164',
      manufacturerId: 3,
      colorId: 10,
      typeId: 2,
      stockInDate: new Date('2023-12-01'),
      sellDate: new Date('2024-01-10'),
      packageId: 3,
    },
    {
      serialNumber: 'LD01123',
      manufacturerId: 3,
      colorId: 10,
      typeId: 4,
      stockInDate: new Date('2023-12-01'),
      sellDate: new Date('2024-01-10'),
      packageId: 3,
    },
    {
      serialNumber: 'YTN230403037395',
      manufacturerId: 3,
      colorId: 10,
      typeId: 5,
      stockInDate: new Date('2023-12-01'),
      sellDate: new Date('2024-01-10'),
      packageId: 3,
    },
    //
    {
      serialNumber: 'EGA9396',
      manufacturerId: 4,
      colorId: 8,
      typeId: 1,
      stockInDate: new Date('2024-06-19'),
      sellDate: null,
      packageId: 4,
    },
    {
      serialNumber: 'EGB4159',
      manufacturerId: 4,
      colorId: 8,
      typeId: 2,
      stockInDate: new Date('2024-06-19'),
      sellDate: null,
      packageId: 4,
    },
    {
      serialNumber: 'MD11090',
      manufacturerId: 4,
      colorId: 8,
      typeId: 4,
      stockInDate: new Date('2024-06-19'),
      sellDate: null,
      packageId: 4,
    },
    {
      serialNumber: 'YT1240901016776',
      manufacturerId: 4,
      colorId: 8,
      typeId: 5,
      stockInDate: new Date('2024-06-19'),
      sellDate: null,
      packageId: 4,
    },
    //
    {
      serialNumber: '2336N2U7U',
      manufacturerId: 2,
      colorId: 5,
      typeId: 2,
      stockInDate: new Date('2024-06-25'),
      sellDate: null,
      packageId: null,
    },
    {
      serialNumber: '2422N0HL3',
      manufacturerId: 2,
      colorId: 5,
      typeId: 1,
      stockInDate: new Date('2024-06-25'),
      sellDate: null,
      packageId: null,
    },
    {
      serialNumber: '242284HIL9',
      manufacturerId: 5,
      colorId: 9,
      typeId: 1,
      stockInDate: new Date('2024-06-25'),
      sellDate: null,
      packageId: null,
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
