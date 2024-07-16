import { PartialType } from '@nestjs/mapped-types';
import { CreateManufacturerDto } from './create-manufacturer.dto';

/* Used by PUT, PATCH */
export class UpdateManufacturerDto extends PartialType(CreateManufacturerDto) {}
