<<<<<<< HEAD
//obras-empreendimentos.entity.ts
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
=======
// src/obras-empreendimentos/entities/obras-empreendimento.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
>>>>>>> main
import { Filiais } from "../../filiais/entities/filiais.entity";
import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

<<<<<<< HEAD
@Entity('OBRAS')
export class Obras {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID gerado automaticamente' })
    id?: string;
=======
@Entity ('OBRAS')
export class Obras {

    @PrimaryGeneratedColumn('uuid')
    id?: string; // Ajustado para string por causa do UUID
>>>>>>> main

    @Column()
    @ApiProperty({ example: 'Residencial Vida Nova', description: 'Nome do empreendimento ou obra' })
    nome_obra?: string;

<<<<<<< HEAD
    // Relacionamento: Muitas obras pertencem a uma filial
    @ApiHideProperty() // Escondemos para o Swagger não pedir para o usuário digitar a filial inteira
    @ManyToOne(() => Filiais, (filial) => filial.obras)
    filial?: Filiais;
=======
    // Relacionamento: Muitas obras pertencem a muitas Filiais
    @ManyToMany(() => Filiais, (filial) => filial.obras)
    @JoinTable() // Essencial para o ManyToMany funcionar no TypeORM!
    filiais?: Filiais[]; // Ajustado para array []
>>>>>>> main

    // Relacionamento: Uma obra tem várias notas
    @ApiHideProperty() // Escondemos pelo mesmo motivo, as notas são atreladas depois
    @OneToMany(() => Notas, (nota) => nota.obra)
    notas?: Notas[];
}
<<<<<<< HEAD

//@ApiProperty -> aparece
//@ApiHideProperty -> nao aparece
=======

// //obras-empreendimento.entity.ts

// import { Column, Entity, PrimaryGeneratedColumn,ManyToMany,OneToMany } from "typeorm";
// import { Filiais } from "../../filiais/entities/filiais.entity";
// import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";

// @Entity ('OBRAS')
// export class Obras{

//     @PrimaryGeneratedColumn('uuid')
//     id?: number;

//     @Column()
//     nome_obra?: string;

//     @Column()
//     filiais?: string;

//     // Relacionamento: Muitas obras pertencem a uma única Filial
//     @ManyToMany(() => Filiais, (filial) => filial.obras)
//     filial?: Filiais;

//     // Relacionamento: Uma obra pode ter várias notas fiscais vinculadas
//     @OneToMany(() => Notas, (nota) => nota.obra)
//     notas?: Notas[];

    
    
// }
>>>>>>> main
