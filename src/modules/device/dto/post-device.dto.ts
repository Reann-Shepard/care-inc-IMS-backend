import {
  IsBoolean,
  IsDate,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class PostDeviceDto {
  @IsOptional()
  @IsString()
  serialNumber?: string | null;

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
  sellDate?: Date;

  @IsOptional()
  @IsInt()
  packageId?: number;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
