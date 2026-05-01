import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('FILIAIS')
export class Filiais{
    @PrimaryGeneratedColumn('uuid')
    id?: number; 

    @Column()
    nome?: string

    @Column()
    cidade?: string

}


