import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderCustomers() {
  const orderCustomers = [
    {
      orderDate: new Date('2024-01-01'),
      orderTotal: 1000,
      rebate: 50.0,
      finalPaid: 950.0,
    },
    {
      orderDate: new Date('2024-02-01'),
      orderTotal: 1500,
      rebate: 75.0,
      finalPaid: 1425.0,
    },
    {
      orderDate: new Date('2024-03-01'),
      orderTotal: 1200,
      rebate: 60.0,
      finalPaid: 1140.0,
    },
    {
      orderDate: new Date('2024-04-01'),
      orderTotal: 2000,
      rebate: 100.0,
      finalPaid: 1900.0,
    },
    {
      orderDate: new Date('2024-05-01'),
      orderTotal: 1700,
      rebate: 85.0,
      finalPaid: 1615.0,
    },
  ];

  for (const orderCustomer of orderCustomers) {
    const existingOrderCustomer = await prisma.orderCustomer.findFirst({
      where: {
        orderDate: orderCustomer.orderDate,
      },
    });

    if (!existingOrderCustomer) {
      const newOrderCustomer = await prisma.orderCustomer.create({
        data: orderCustomer,
      });
      console.log(`OrderCustomer Created: ${newOrderCustomer.id}`);
    } else {
      console.log(
        `OrderCustomer already exists for orderDate: ${orderCustomer.orderDate}`,
      );
    }
  }
}
