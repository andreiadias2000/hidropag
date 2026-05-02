import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obras } from "../../obras-empreendimentos/entities/obras-empreendimento.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity('FILIAIS')
export class Filiais{
    @PrimaryGeneratedColumn('uuid')
    id?: number; 

    @Column()
    nome?: string

    @Column()
    cidade?: string

    // Relacionamento: Uma filial pode ter muitas obras
    @OneToMany(() => Obras, (obra) => obra.filiais)
    obras?: Obras[];

    // Relacionamento: Uma filial pode ter muitos usuários
    @OneToMany(() => Usuarios, (usuario) => usuario.filial)
    usuarios?: Usuarios[];

}


