-- DropForeignKey
ALTER TABLE "package" DROP CONSTRAINT "package_clientId_fkey";

-- DropForeignKey
ALTER TABLE "package" DROP CONSTRAINT "package_orderCustomerId_fkey";

-- AlterTable
ALTER TABLE "package" ALTER COLUMN "clientId" DROP NOT NULL,
ALTER COLUMN "fittingDate" DROP NOT NULL,
ALTER COLUMN "warrantyExpiration" DROP NOT NULL,
ALTER COLUMN "orderCustomerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_orderCustomerId_fkey" FOREIGN KEY ("orderCustomerId") REFERENCES "order_customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
