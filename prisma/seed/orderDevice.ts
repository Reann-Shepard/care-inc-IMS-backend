import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderDevices() {
  const orderDevices = [
    {
      deviceId: 1,
      orderManufacturerId: 1,
    },
    {
      deviceId: 2,
      orderManufacturerId: 2,
    },
    {
      deviceId: 3,
      orderManufacturerId: 3,
    },
    {
      deviceId: 4,
      orderManufacturerId: 4,
    },
    {
      deviceId: 5,
      orderManufacturerId: 5,
    },
  ];

  for (const orderDevice of orderDevices) {
    const existingOrderDevice = await prisma.orderDevice.findFirst({
      where: {
        deviceId: orderDevice.deviceId,
        orderManufacturerId: orderDevice.orderManufacturerId,
      },
    });

    if (!existingOrderDevice) {
      const newOrderDevice = await prisma.orderDevice.create({
        data: orderDevice,
      });
      console.log(
        `OrderDevice Created: Device ID ${newOrderDevice.deviceId}, Order Manufacturer ID ${newOrderDevice.orderManufacturerId}`,
      );
    } else {
      console.log(
        `OrderDevice already exists: Device ID ${orderDevice.deviceId}, Order Manufacturer ID ${orderDevice.orderManufacturerId}`,
      );
    }
  }
}

seedOrderDevices()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
