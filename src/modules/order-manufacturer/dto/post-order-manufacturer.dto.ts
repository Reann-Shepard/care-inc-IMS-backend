import { IsInt, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PostOrderDeviceDto } from 'src/modules/order-device/dto/post-order-device.dto';

export class PostOrderManufacturerDto {
  @IsInt()
  amount: number;

  @IsDate()
  orderDate: Date;

  @IsArray()
  @Type(() => PostOrderDeviceDto)
  OrderDevices: PostOrderDeviceDto[];
}
