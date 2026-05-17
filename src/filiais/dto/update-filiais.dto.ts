// update-filiais.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateFilialDto } from './create-filiais.dto';

export class UpdateFilialDto extends PartialType(CreateFilialDto) {}