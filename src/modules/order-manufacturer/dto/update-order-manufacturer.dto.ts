import { IsInt, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderDeviceDto } from '../../order-device/dto/order-device.dto';

export class UpdateOrderManufacturerDto {
  @IsInt()
  id: number;

  @IsInt()
  amount: number;

  @IsDate()
  orderDate: Date;

  @IsArray()
  @Type(() => OrderDeviceDto)
  OrderDevices: OrderDeviceDto[];
}
