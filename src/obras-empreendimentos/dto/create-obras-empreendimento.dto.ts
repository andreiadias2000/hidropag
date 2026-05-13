//export class CreateObrasEmpreendimentoDto {}

import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

// auxilia apenas para validar o objeto da filial
export class FilialIdDto {
  @ApiProperty({ 
    example: 'd3b07384-d113-4c4e-9c95-bd845d471018', 
    description: 'ID (UUID) da filial responsável' 
  })
  @IsUUID(undefined, { message: 'O ID da filial deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O ID da filial é obrigatório' })
  id!: string;
}

// DTO principal da Obra
export class CreateObrasEmpreendimentoDto {
  @ApiProperty({ 
    example: 'Hospital Moinhos de Vento', 
    description: 'Nome único da obra' 
  })
  @IsString({ message: 'O nome da obra deve ser um texto' })
  @IsNotEmpty({ message: 'O campo nome da obra é obrigatório' })
  nome_obra!: string;

  // usado  @ValidateNested e @Type para o NestJS entrar e validar o { id: "..." }
  @ApiProperty({ 
    type: () => FilialIdDto, 
    description: 'Objeto contendo o ID da filial vinculada' 
  })
  @ValidateNested()
  @Type(() => FilialIdDto)
  @IsNotEmpty({ message: 'A filial vinculada é obrigatória' })
  filial!: FilialIdDto;
}
