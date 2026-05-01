import { timeStamp } from "node:console";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('APROVACOES')

export class APROVACOES{

    @PrimaryGeneratedColumn('uuid')
    id?: number;

    @Column()
    decisao?: number;

    @Column()
    observacao?: string;

    @Column({type: 'timestamp'})
    decidido_em?: string;




}
