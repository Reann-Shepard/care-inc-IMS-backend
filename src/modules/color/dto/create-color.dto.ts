import { IsNotEmpty, IsString } from 'class-validator';

/* Used by POST */
export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}
