import {
  IsString,
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

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
