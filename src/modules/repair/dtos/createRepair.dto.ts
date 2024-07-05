import { Transform } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateRepairDto {
  @IsInt()
  @IsNotEmpty()
  client: number;

  @IsInt()
  @IsNotEmpty()
  manufacturer: number;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  shippingDate: Date;

  @IsString()
  @IsNotEmpty()
  shipId: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  receivedDate?: Date;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsInt({ each: true })
  repairDevices: number[];
}
