import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';
import { DeviceDto } from 'src/modules/device/dto/device.dto';

export class OrderDeviceDto {
  @IsObject()
  @Type(() => DeviceDto)
  device: DeviceDto;
}
