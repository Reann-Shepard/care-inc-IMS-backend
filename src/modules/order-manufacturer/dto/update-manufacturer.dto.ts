import {
  IsInt,
  IsString,
  IsOptional,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class DeviceDto {
  @IsInt()
  id: number;

  @IsString()
  serialNumber: string;

  @IsInt()
  manufacturerId: number;

  @IsInt()
  colorId: number;

  @IsInt()
  typeId: number;

  @IsDate()
  stockDate: Date;

  @IsOptional()
  @IsDate()
  sellDate?: Date;

  @IsOptional()
  @IsInt()
  packageId?: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
