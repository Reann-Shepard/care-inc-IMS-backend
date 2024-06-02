import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRepairDevices() {
  const repairDevices = [
    {
      repairId: 1,
      deviceId: 1,
    },
    {
      repairId: 2,
      deviceId: 2,
    },
    {
      repairId: 1,
      deviceId: 3,
    },
    {
      repairId: 2,
      deviceId: 4,
    },
    {
      repairId: 1,
      deviceId: 5,
    },
  ];

  for (const repairDevice of repairDevices) {
    const existingRepairDevice = await prisma.repairDevice.findFirst({
      where: {
        repairId: repairDevice.repairId,
        deviceId: repairDevice.deviceId,
      },
    });

    if (!existingRepairDevice) {
      const newRepairDevice = await prisma.repairDevice.create({
        data: repairDevice,
      });
      console.log(
        `RepairDevice Created: Repair ID ${newRepairDevice.repairId}, Device ID ${newRepairDevice.deviceId}`,
      );
    } else {
      console.log(
        `RepairDevice already exists: Repair ID ${repairDevice.repairId}, Device ID ${repairDevice.deviceId}`,
      );
    }
  }
}
