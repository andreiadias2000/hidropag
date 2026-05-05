<<<<<<< HEAD
//aprovaçoes.entity.ts
=======

// src/aprovaçoes/entities/aprovaçoe.entity.ts
>>>>>>> main

import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('APROVACOES')
export class APROVACOES {

<<<<<<< HEAD
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID gerado automaticamente' })
    id?: string; // Ajustado de number para string por causa do UUID

    @Column()
    @ApiProperty({ example: 1, description: '1 para Aprovado, 0 para Recusado' })
    decisao?: number;

    @Column()
    @ApiProperty({ example: 'Nota fiscal conferida e aprovada pelo setor financeiro.', description: 'Observações gerais' })
    observacao?: string;

    // Vai registrar o momento exato em que a aprovação foi feita no sistema
    @CreateDateColumn()
    @ApiProperty({ example: '2026-05-04T21:28:27.000Z', description: 'Data e hora da aprovação' })
    data_aprovacao?: Date;

=======
    @PrimaryGeneratedColumn()
    id?: number;

    // A decisão agora é número: Ex: 1 = Aprovado, 2 = Reprovado
    @Column({ nullable: true })
    decisao?: number;

    @Column({ nullable: true })
    observacao?: string;

>>>>>>> main
    // Relacionamento: Muitas aprovações podem referenciar a mesma Nota
    @ApiHideProperty() // Escondemos para o Swagger ficar limpo
    @ManyToOne(() => Notas, (nota) => nota.aprovacoes)
    nota?: Notas;

    // Relacionamento: Muitas aprovações são feitas por um único Usuário
    @ApiHideProperty() // Escondemos para o Swagger ficar limpo
    @ManyToOne(() => Usuarios, (usuario) => usuario.aprovacoes)
    usuario?: Usuarios;
<<<<<<< HEAD
}

=======

    @CreateDateColumn({ type: 'timestamp' })
    decidido_em?: Date;
}

//



// //aprovaçoes.entity.ts

>>>>>>> main
// import { timeStamp } from "node:console";
// import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";
// import { Usuarios } from "../../usuarios/entities/usuario.entity";
<<<<<<< HEAD
// import { ApiProperty } from '@nestjs/swagger';
=======

>>>>>>> main
// @Entity('APROVACOES')

// export class APROVACOES{

//     @PrimaryGeneratedColumn('uuid')
//     id?: number;

//     @Column()
//     decisao?: number;

//     @Column()
//     observacao?: string;

    
//     // Relacionamento: Muitas aprovações podem referenciar a mesma Nota
//     @ManyToOne(() => Notas, (nota) => nota.aprovacoes)
//     nota?: Notas;

//     // Relacionamento: Muitas aprovações podem ser feitas pelo mesmo Usuário
//     @ManyToOne(() => Usuarios, (usuario) => usuario.aprovacoes)
//     usuario?: Usuarios;

//     @CreateDateColumn({ type: 'timestamp' })
//     decidido_em?: Date; //[cite: 1]



// }
<<<<<<< HEAD
=======

>>>>>>> main
