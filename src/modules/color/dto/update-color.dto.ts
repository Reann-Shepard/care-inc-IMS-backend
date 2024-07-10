import { PartialType } from '@nestjs/mapped-types';
import { CreateColorDto } from './create-color.dto';

/* Used by PUT, PATCH */
export class UpdateColorDto extends PartialType(CreateColorDto) {}
