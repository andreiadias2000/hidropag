import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne } from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { Notas } from "../../notas-fiscais/entities/notas-fiscais.entity";

@Entity('OBRAS')
export class Obras {
    @PrimaryGeneratedColumn('uuid')
    id?: string; // Ajuste para string

    @Column()
    nome_obra?: string;

    // Relacionamento corrigido: ManyToOne aponta para filial.obras
    @ManyToOne(() => Filiais, (filial) => filial.obras) // Muitos para Um[cite: 9, 13]
    filial?: Filiais;

    @OneToMany(() => Notas, (nota) => nota.obra)
    notas?: Notas[];
}