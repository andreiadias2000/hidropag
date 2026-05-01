import { Column, Entity, PrimaryGeneratedColumn, } from "typeorm";

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

    @Column({type: 'bytea',
        nullable: true,
    })
    arquivoPdf?:Buffer;
    




}