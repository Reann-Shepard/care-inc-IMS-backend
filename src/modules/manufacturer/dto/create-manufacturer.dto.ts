import { IsNotEmpty, IsString } from 'class-validator';

/* Used by POST */
export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
