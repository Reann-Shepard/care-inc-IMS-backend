import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderManufacturers() {
  const orderManufacturers = [
    {
      manufacturerId: 1,
      colorId: 1,
      typeId: 1,
      orderDate: new Date('2024-01-01'),
      amount: 100,
    },
    {
      manufacturerId: 2,
      colorId: 2,
      typeId: 2,
      orderDate: new Date('2024-02-01'),
      amount: 55,
    },
    {
      manufacturerId: 3,
      colorId: 3,
      typeId: 3,
      orderDate: new Date('2024-03-01'),
      amount: 60,
    },
    {
      manufacturerId: 4,
      colorId: 4,
      typeId: 4,
      orderDate: new Date('2024-04-01'),
      amount: 65,
    },
    {
      manufacturerId: 5,
      colorId: 5,
      typeId: 5,
      orderDate: new Date('2024-05-01'),
      amount: 80,
    },
  ];

  for (const orderManufacturer of orderManufacturers) {
    const existingOrderManufacturer = await prisma.orderManufacturer.findFirst({
      where: {
        manufacturerId: orderManufacturer.manufacturerId,
        orderDate: orderManufacturer.orderDate,
      },
    });

    if (!existingOrderManufacturer) {
      const newOrderManufacturer = await prisma.orderManufacturer.create({
        data: orderManufacturer,
      });
      console.log(`OrderManufacturer Created: ${newOrderManufacturer.id}`);
    } else {
      console.log(
        `OrderManufacturer already exists for manufacturerId: ${orderManufacturer.manufacturerId} and orderDate: ${orderManufacturer.orderDate}`,
      );
      await prisma.orderManufacturer.update({
        where: { id: existingOrderManufacturer.id },
        data: {
          colorId: orderManufacturer.colorId,
          typeId: orderManufacturer.typeId,
          amount: orderManufacturer.amount,
        },
      });
      console.log(`OrderManufacturer Updated: ${existingOrderManufacturer.id}`);
    }
  }
}
