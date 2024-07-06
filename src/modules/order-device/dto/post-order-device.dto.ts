import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { PostDeviceDto } from 'src/modules/device/dto/post-device.dto';

export class PostOrderDeviceDto {
  @IsInt()
  deviceId: number;

  @IsInt()
  orderManufacturerId: number;

  @Type(() => PostDeviceDto)
  device: PostDeviceDto;
}
