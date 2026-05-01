import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuarios{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string 

    @Column()
    email?: string;

    @Column()
    senha?: number
    
    @Column()
    perfil?: string

    @Column()
    filial?: string


}