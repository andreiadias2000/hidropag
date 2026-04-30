import { PartialType } from '@nestjs/mapped-types';
import { CreateFiliaiDto } from './create-filiai.dto';

export class UpdateFiliaiDto extends PartialType(CreateFiliaiDto) {}
