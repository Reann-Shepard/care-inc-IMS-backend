import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsDateString()
  @IsNotEmpty()
  stockInDate: string;

  @IsOptional()
  @IsDateString()
  sellDate: string;

  @IsInt()
  @IsNotEmpty()
  manufacturerId: number;

  @IsInt()
  @IsNotEmpty()
  typeId: number;

  @IsInt()
  @IsNotEmpty()
  color: number;
}
