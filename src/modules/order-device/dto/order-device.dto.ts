import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { DeviceDto } from '../../device/dto/device.dto';

export class OrderDeviceDto {
  @IsInt()
  deviceId: number;

  @IsInt()
  orderManufacturerId: number;

  @Type(() => DeviceDto)
  device: DeviceDto;
}
