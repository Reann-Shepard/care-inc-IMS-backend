import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedOrderCustomers() {
  const orderCustomers = [
    {
      orderDate: new Date('2024-01-01'),
      orderTotal: 100,
      amount: 100.0,
      rebate: 10.0,
      finalPaid: 90.0,
    },
    {
      orderDate: new Date('2024-02-01'),
      orderTotal: 200,
      amount: 200.0,
      rebate: 20.0,
      finalPaid: 180.0,
    },
    {
      orderDate: new Date('2024-03-01'),
      orderTotal: 300,
      amount: 300.0,
      rebate: 30.0,
      finalPaid: 270.0,
    },
    {
      orderDate: new Date('2024-04-01'),
      orderTotal: 400,
      amount: 400.0,
      rebate: 40.0,
      finalPaid: 360.0,
    },
    {
      orderDate: new Date('2024-05-01'),
      orderTotal: 500,
      amount: 500.0,
      rebate: 50.0,
      finalPaid: 450.0,
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
