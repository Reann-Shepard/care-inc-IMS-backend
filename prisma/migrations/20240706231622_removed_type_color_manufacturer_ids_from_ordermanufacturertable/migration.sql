/*
  Warnings:

  - You are about to drop the column `colorId` on the `order_manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `manufacturerId` on the `order_manufacturer` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `order_manufacturer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_manufacturer" DROP COLUMN "colorId",
DROP COLUMN "manufacturerId",
DROP COLUMN "typeId";
