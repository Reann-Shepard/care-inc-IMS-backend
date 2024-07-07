import { IsString } from 'class-validator';

export class UpdateManufacturerDto {
  @IsString()
  name: string;
}
