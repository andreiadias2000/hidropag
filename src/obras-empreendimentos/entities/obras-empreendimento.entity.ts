// src/obras-empreendimentos/entities/obras-empreendimento.entity.ts

import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";

@Entity ('OBRAS')
export class Obras {

    @PrimaryGeneratedColumn('uuid')
    id?: string; // Ajustado para string por causa do UUID

    @Column()
    nome_obra?: string;

    // Relacionamento: Muitas obras pertencem a muitas Filiais
    @ManyToMany(() => Filiais, (filial) => filial.obras)
    @JoinTable() // Essencial para o ManyToMany funcionar no TypeORM!
    filiais?: Filiais[]; // Ajustado para array []

    // Relacionamento: Uma obra pode ter várias notas fiscais vinculadas
    @OneToMany(() => Notas, (nota) => nota.obra)
    notas?: Notas[];
}

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