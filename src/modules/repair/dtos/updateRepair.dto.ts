import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class UpdateRepairDto {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  receivedDate?: Date;
}
