import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderManufacturers() {
  const orderManufacturers = [
    {
      orderDate: new Date('2022-12-20'),
      amount: 4,
    },
    {
      orderDate: new Date('2023-01-01'),
      amount: 4,
    },
    {
      orderDate: new Date('2023-01-02'),
      amount: 4,
    },
    {
      orderDate: new Date('2024-06-01'),
      amount: 4,
    },
    {
      orderDate: new Date('2024-06-15'),
      amount: 3,
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
