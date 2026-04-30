import { PartialType } from '@nestjs/mapped-types';
import { CreateNotasFiscaiDto } from './create-notas-fiscai.dto';

export class UpdateNotasFiscaiDto extends PartialType(CreateNotasFiscaiDto) {}
