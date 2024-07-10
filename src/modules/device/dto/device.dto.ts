import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class DeviceDto {
  @IsInt()
  id: number;

  @IsString()
  serialNumber: string | null;

  @IsInt()
  manufacturerId: number;

  @IsInt()
  colorId: number;

  @IsInt()
  typeId: number;

  @IsOptional()
  @IsDate()
  stockInDate?: Date | null;

  @IsOptional()
  @IsDate()
  sellDate?: Date | null;

  @IsOptional()
  @IsInt()
  packageId?: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean | null;
}
