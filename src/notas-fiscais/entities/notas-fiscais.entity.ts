import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,OneToMany } from "typeorm";
import { APROVACOES } from "../../aprovaçoes/entities/aprovaçoe.entity";
import { Obras } from "../../obras-empreendimentos/entities/obras-empreendimento.entity";

@Entity('NOTAS')
export class Notas {
    @PrimaryGeneratedColumn('uuid')
    id?: number;

    @Column()
    numero_nf?: number;

    @Column()
    fornecedor?: string;

    @Column({type: 'date'})
    data_vencimento?: string;

    @Column()
    valor_total?: number;

    @Column()
    quant_parcelas?: number;

    @Column()
    status?: number;

    @Column({ type: 'bytea', nullable: true })
    arquivoPdf?: Buffer; //[cite: 3]
    
    // Relacionamento: Muitas notas pertencem a uma única Obra
    @ManyToOne(() => Obras, (obra) => obra.notas)
    obra?: Obras;

    // Relacionamento: Uma nota pode passar por várias aprovações/histórico
    @OneToMany(() => APROVACOES, (aprovacao) => aprovacao.nota)
    aprovacoes?: APROVACOES[];

}