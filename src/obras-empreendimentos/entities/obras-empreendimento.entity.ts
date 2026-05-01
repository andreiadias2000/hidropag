import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ('OBRAS')
export class Obras{

    @PrimaryGeneratedColumn('uuid')
    id?: number;

    @Column()
    nome_obra?: string;

    @Column()
    filiais?: string;

    
    
}