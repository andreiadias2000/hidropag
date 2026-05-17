import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsBoolean, IsOptional, IsUUID } from "class-validator";

export class CreateObrasEmpreendimentoDto {
    @ApiProperty({ example: 'Hospital Moinhos de Vento', description: 'Nome único da Obra' })
    @IsString({ message: 'O nome da obra deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome da obra é obrigatório.' })
    nome_obra?: string;

    @ApiProperty({ example: true, description: 'Indica se a obra está ativa ou concluída/arquivada', default: true, required: false })
    @IsBoolean({ message: 'O campo ativo deve ser um booleano.' })
    @IsOptional()
    ativo?: boolean;

    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'ID (UUID) da filial vinculada à obra' })
    @IsUUID('4', { message: 'O ID da filial deve ser um UUID válido.' })
    @IsNotEmpty({ message: 'O vínculo com uma filial é obrigatório.' })
    filialId?: string;
}