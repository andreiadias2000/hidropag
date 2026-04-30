import { PartialType } from '@nestjs/mapped-types';
import { CreateObrasEmpreendimentoDto } from './create-obras-empreendimento.dto';

export class UpdateObrasEmpreendimentoDto extends PartialType(CreateObrasEmpreendimentoDto) {}
