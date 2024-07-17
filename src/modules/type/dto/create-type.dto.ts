import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
