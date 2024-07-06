import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderManufacturers() {
  const orderManufacturers = [
    {
      orderDate: new Date('2024-01-01'),
      amount: 100,
    },
    {
      orderDate: new Date('2024-02-01'),
      amount: 55,
    },
    {
      orderDate: new Date('2024-03-01'),
      amount: 60,
    },
    {
      orderDate: new Date('2024-04-01'),
      amount: 65,
    },
    {
      orderDate: new Date('2024-05-01'),
      amount: 80,
    },
  ];

  for (const orderManufacturer of orderManufacturers) {
    const existingOrderManufacturer = await prisma.orderManufacturer.findFirst({
      where: {
        orderDate: orderManufacturer.orderDate,
      },
    });

    if (!existingOrderManufacturer) {
      const newOrderManufacturer = await prisma.orderManufacturer.create({
        data: orderManufacturer,
      });
      console.log(`OrderManufacturer Created: ${newOrderManufacturer.id}`);
    } else {
      console.log(`orderDate: ${orderManufacturer.orderDate}`);
      await prisma.orderManufacturer.update({
        where: { id: existingOrderManufacturer.id },
        data: {
          amount: orderManufacturer.amount,
        },
      });
      console.log(`OrderManufacturer Updated: ${existingOrderManufacturer.id}`);
    }
  }
}
