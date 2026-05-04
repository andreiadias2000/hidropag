// usuario.entity.ts
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, } from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { APROVACOES } from "../../aprovaçoes/entities/aprovaçoe.entity";

@Entity()
export class Usuarios{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string 

    @Column()
    email?: string;

    @Column({ nullable: true }) // aqui para aceitar nullo por enquanto para os testes
    senha?: string;
    
    @Column()
    perfil?: string

    // Relacionamento: Muitos usuários trabalham em uma Filial
    @ManyToOne(() => Filiais, (filial) => filial.usuarios)
    filial?: Filiais;

    // Relacionamento: Um usuário pode realizar várias aprovações
    @OneToMany(() => APROVACOES, (aprovacao) => aprovacao.usuario)
    aprovacoes?: APROVACOES[];


}