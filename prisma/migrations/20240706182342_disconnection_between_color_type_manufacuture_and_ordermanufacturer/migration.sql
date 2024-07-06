-- DropForeignKey
ALTER TABLE "order_manufacturer" DROP CONSTRAINT "order_manufacturer_colorId_fkey";

-- DropForeignKey
ALTER TABLE "order_manufacturer" DROP CONSTRAINT "order_manufacturer_manufacturerId_fkey";

-- DropForeignKey
ALTER TABLE "order_manufacturer" DROP CONSTRAINT "order_manufacturer_typeId_fkey";

-- AlterTable
ALTER TABLE "order_manufacturer" ALTER COLUMN "manufacturerId" DROP NOT NULL,
ALTER COLUMN "colorId" DROP NOT NULL,
ALTER COLUMN "typeId" DROP NOT NULL;
