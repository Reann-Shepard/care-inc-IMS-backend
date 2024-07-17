import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOrderManufacturerDto } from './dto/update-order-manufacturer.dto';
import { PostOrderManufacturerDto } from './dto/post-order-manufacturer.dto';

@Injectable()
export class OrderManufacturerService {
  constructor(private prisma: PrismaService) {}

  async getAllOrderManufacturer() {
    return this.prisma.orderManufacturer.findMany({
      select: {
        id: true,
        amount: true,
        orderDate: true,
        OrderDevices: {
          select: {
            device: {
              select: {
                id: true,
                color: true,
                type: true,
                manufacturer: true,
                stockInDate: true,
              },
            },
          },
        },
      },
    });
  }

  async getOrderManufacturerById(id: number) {
    return this.prisma.orderManufacturer.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        amount: true,
        orderDate: true,
        OrderDevices: {
          select: {
            device: {
              select: {
                id: true,
                colorId: true,
                typeId: true,
                manufacturerId: true,
                color: true,
                type: true,
                manufacturer: true,
                serialNumber: true,
                deleted: true,
                stockInDate: true,
              },
            },
          },
        },
      },
    });
  }

  async updateOrderManufacturerById(
    id: number,
    updateOrderManufacturerDto: UpdateOrderManufacturerDto,
  ) {
    const { OrderDevices = [], ...orderManufacturerData } =
      updateOrderManufacturerDto;

    try {
      await this.prisma.orderManufacturer.update({
        where: { id: Number(id) },
        data: orderManufacturerData,
      });

      for (const orderDevice of OrderDevices) {
        const { deviceId, orderManufacturerId, device } = orderDevice;

        if (deviceId && orderManufacturerId) {
          await this.prisma.orderDevice.update({
            where: {
              deviceId_orderManufacturerId: {
                deviceId: Number(deviceId),
                orderManufacturerId: Number(orderManufacturerId),
              },
            },
            data: {
              device: {
                update: {
                  ...device,
                },
              },
            },
          });
        }
      }

      return this.getOrderManufacturerById(Number(id));
    } catch (error) {
      console.error('Error updating order manufacturer:', error);
      throw new InternalServerErrorException(
        'Failed to update order manufacturer',
      );
    }
  }

  async postOrderManufacturer(
    postOrderManufacturerDto: PostOrderManufacturerDto,
  ) {
    const { OrderDevices = [], ...orderManufacturerData } =
      postOrderManufacturerDto;

    try {
      const createdOrderManufacturer =
        await this.prisma.orderManufacturer.create({
          data: {
            amount: orderManufacturerData.amount,
            orderDate: orderManufacturerData.orderDate,
          },
        });

      for (const orderDevice of OrderDevices) {
        const deviceData = {
          serialNumber: orderDevice.device.serialNumber ?? null,
          colorId: orderDevice.device.colorId,
          manufacturerId: orderDevice.device.manufacturerId,
          typeId: orderDevice.device.typeId,
          stockInDate: orderDevice.device.stockInDate ?? null,
          deleted: orderDevice.device.deleted ?? null,
        };

        await this.prisma.orderDevice.create({
          data: {
            device: {
              create: deviceData,
            },
            orderManufacturer: {
              connect: { id: createdOrderManufacturer.id },
            },
          },
        });
      }

      return this.getOrderManufacturerById(createdOrderManufacturer.id);
    } catch (error) {
      console.error('Error creating order manufacturer:', error);
      throw new InternalServerErrorException(
        'Failed to create order manufacturer',
      );
    }
  }
}
