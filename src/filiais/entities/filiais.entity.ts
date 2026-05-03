// //filiais.entity.ts
// import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Obras } from "../../obras-empreendimentos/entities/obras-empreendimento.entity";
// import { Usuarios } from "../../usuarios/entities/usuario.entity";

// @Entity('FILIAIS')
// export class Filiais{
//     @PrimaryGeneratedColumn('uuid')
//     id?: number; 

//     @Column()
//     nome?: string

//     @Column()
//     cidade?: string

//     // Relacionamento: Uma filial pode ter muitas obras
//     @OneToMany(() => Obras, (obra) => obra.filiais)
//     obras?: Obras[];

//     // Relacionamento: Uma filial pode ter muitos usuários
//     @OneToMany(() => Usuarios, (usuario) => usuario.filial)
//     usuarios?: Usuarios[];

// }


// filiais.entity.ts
import { 
  Column, 
  Entity, 
  OneToMany, 
  ManyToMany, // <-- 1. Adicionamos o ManyToMany aqui em cima
  PrimaryGeneratedColumn 
} from "typeorm";
import { Obras } from "../../obras-empreendimentos/entities/obras-empreendimento.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity('FILIAIS')
export class Filiais{
    
    // o id é 'number' (1, 2, 3), 
    // tirei a palavra 'uuid' de dentro dos parênteses para não dar erro no banco, 
    // pois uuid gera textos muito granmdes com letras e números!
    @PrimaryGeneratedColumn() 
    id?: number; 

    @Column()
    nome?: string

    @Column()
    cidade?: string

    // Relacionamento: Uma filial pode ter muitas obras 
    @OneToMany(() => Obras, (obra) => obra.filiais)
    obras?: Obras[];

    // Relacionamento: Uma filial pode ser acessada por muitos usuários 
    // Trocamos OneToMany por ManyToMany e avisamos que o outro lado se chama "filiaisPermitidas"
    @ManyToMany(() => Usuarios, (usuario) => usuario.filiaisPermitidas)
    usuarios?: Usuarios[];

}