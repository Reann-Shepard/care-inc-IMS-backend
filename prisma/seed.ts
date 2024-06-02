import { PrismaClient } from '@prisma/client';
import { seedClients } from './seed/client';
import { seedRepairs } from './seed/repair';
import { seedManufacturers } from './seed/manufacturer';
import { seedColors } from './seed/color';
import { seedDevices } from './seed/device';
import { seedTypes } from './seed/type';
import { seedPackages } from './seed/package';
import { seedOrderCustomers } from './seed/orderCustomer';
import { seedOrderManufacturers } from './seed/orderManufacturer';
import { seedOrderDevices } from './seed/orderDevice';
import { seedRepairDevices } from './seed/repairDevice';

const prisma = new PrismaClient();

async function main() {
  await seedClients();
  await seedManufacturers();
  await seedColors();
  await seedTypes();
  await seedOrderCustomers();
  await seedPackages();
  await seedDevices();
  await seedOrderManufacturers();
  await seedOrderDevices();
  await seedRepairs();
  await seedRepairDevices();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
