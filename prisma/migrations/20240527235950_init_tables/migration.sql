-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manufacturer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "stockInDate" TIMESTAMP(3) NOT NULL,
    "sellDate" TIMESTAMP(3),
    "packageId" INTEGER,

    CONSTRAINT "device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_device" (
    "deviceId" INTEGER NOT NULL,
    "orderManufacturerId" INTEGER NOT NULL,

    CONSTRAINT "order_device_pkey" PRIMARY KEY ("deviceId","orderManufacturerId")
);

-- CreateTable
CREATE TABLE "order_manufacturer" (
    "id" SERIAL NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "order_manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "manufacturerId" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "shippingDate" TIMESTAMP(3) NOT NULL,
    "shipId" TEXT NOT NULL,
    "receivedDate" TIMESTAMP(3),

    CONSTRAINT "repair_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "repair_device" (
    "id" SERIAL NOT NULL,
    "repairId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "repair_device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_customer" (
    "id" SERIAL NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "orderTotal" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "rebate" DECIMAL(10,2) NOT NULL,
    "finalPaid" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "fittingDate" TIMESTAMP(3) NOT NULL,
    "warrantyExpiration" TIMESTAMP(3) NOT NULL,
    "orderCustomerId" INTEGER NOT NULL,

    CONSTRAINT "package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "device_serialNumber_key" ON "device"("serialNumber");

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "package"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device" ADD CONSTRAINT "device_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_device" ADD CONSTRAINT "order_device_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_device" ADD CONSTRAINT "order_device_orderManufacturerId_fkey" FOREIGN KEY ("orderManufacturerId") REFERENCES "order_manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_manufacturer" ADD CONSTRAINT "order_manufacturer_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_manufacturer" ADD CONSTRAINT "order_manufacturer_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_manufacturer" ADD CONSTRAINT "order_manufacturer_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair" ADD CONSTRAINT "repair_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_device" ADD CONSTRAINT "repair_device_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "repair_device" ADD CONSTRAINT "repair_device_repairId_fkey" FOREIGN KEY ("repairId") REFERENCES "repair"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package" ADD CONSTRAINT "package_orderCustomerId_fkey" FOREIGN KEY ("orderCustomerId") REFERENCES "order_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
