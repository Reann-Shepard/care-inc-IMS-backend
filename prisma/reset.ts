import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "device" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "device_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "repair_device" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "repair_device_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "order_device" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "package" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "package_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe(
      'TRUNCATE TABLE "order_manufacturer" CASCADE',
    );
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "order_manufacturer_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "repair" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "repair_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "client" CASCADE');
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "color" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "color_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "type" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "type_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "manufacturer" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "manufacturer_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "order_customer" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "order_customer_id_seq" RESTART WITH 1',
    );
    await prisma.$executeRawUnsafe('TRUNCATE TABLE "user" CASCADE');
    await prisma.$executeRawUnsafe(
      'ALTER SEQUENCE "user_id_seq" RESTART WITH 1',
    );
    console.log('Database reset successful.');
  } catch (e) {
    console.error('Failed to reset database: ', e);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
