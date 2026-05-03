import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Obras } from "../../obras-empreendimentos/entities/obras-empreendimento.entity";
import { Usuarios } from "../../usuarios/entities/usuario.entity";

@Entity('FILIAIS')
export class Filiais {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    nome?: string;

    @Column()
    cidade?: string;

    // CORREÇÃO: O campo em Obras chama-se 'filial' (singular)
    @OneToMany(() => Obras, (obra) => obra.filial) // Ajustado para bater com a classe Obras[cite: 9, 13]
    obras?: Obras[];

    @OneToMany(() => Usuarios, (usuario) => usuario.filial)
    usuarios?: Usuarios[];
}

