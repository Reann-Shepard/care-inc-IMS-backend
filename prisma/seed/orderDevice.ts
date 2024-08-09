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
      orderManufacturerId: 1,
    },
    {
      deviceId: 3,
      orderManufacturerId: 1,
    },
    {
      deviceId: 4,
      orderManufacturerId: 1,
    },
    //
    {
      deviceId: 5,
      orderManufacturerId: 2,
    },
    {
      deviceId: 6,
      orderManufacturerId: 2,
    },
    {
      deviceId: 7,
      orderManufacturerId: 2,
    },
    {
      deviceId: 8,
      orderManufacturerId: 2,
    },
    //
    {
      deviceId: 9,
      orderManufacturerId: 3,
    },
    {
      deviceId: 10,
      orderManufacturerId: 3,
    },
    {
      deviceId: 11,
      orderManufacturerId: 3,
    },
    {
      deviceId: 12,
      orderManufacturerId: 3,
    },
    //
    {
      deviceId: 13,
      orderManufacturerId: 4,
    },
    {
      deviceId: 14,
      orderManufacturerId: 4,
    },
    {
      deviceId: 15,
      orderManufacturerId: 4,
    },
    {
      deviceId: 16,
      orderManufacturerId: 4,
    },
    //
    {
      deviceId: 17,
      orderManufacturerId: 5,
    },
    {
      deviceId: 18,
      orderManufacturerId: 5,
    },
    {
      deviceId: 19,
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
