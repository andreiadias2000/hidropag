//obras-empreendimentos.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

@Entity('OBRAS')
export class Obras {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID gerado automaticamente' })
    id?: string;

    @Column()
    @ApiProperty({ example: 'Residencial Vida Nova', description: 'Nome do empreendimento ou obra' })
    nome_obra?: string;

    // Relacionamento: Muitas obras pertencem a uma filial
    @ApiHideProperty() // Escondemos para o Swagger não pedir para o usuário digitar a filial inteira
    @ManyToOne(() => Filiais, (filial) => filial.obras)
    filial?: Filiais;

    // Relacionamento: Uma obra tem várias notas
    @ApiHideProperty() // Escondemos pelo mesmo motivo, as notas são atreladas depois
    @OneToMany(() => Notas, (nota) => nota.obra)
    notas?: Notas[];
}

//@ApiProperty -> aparece
//@ApiHideProperty -> nao aparece
