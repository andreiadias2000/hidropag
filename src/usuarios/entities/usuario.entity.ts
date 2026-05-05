// usuario.entity.ts
import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, } from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { APROVACOES } from "../../aprovaçoes/entities/aprovaçoe.entity";
import { ApiProperty } from '@nestjs/swagger';



@Entity()
export class Usuarios{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    @ApiProperty({ example: 'Ivan Silva', description: 'Nome completo do usuário' })
    nome?: string 

    @Column()
    @ApiProperty({ example: 'ivan@teste.com' })
    email?: string;

    @Column({ nullable: true }) // aqui para aceitar nullo por enquanto para os testes
    @ApiProperty({ example: '123WWFrty67'})
    senha?: string;
    
    @Column()
    @ApiProperty({ example: '1 2 3'})
    perfil?: string

    
    @ManyToOne(() => Filiais, (filial) => filial.usuarios)
    filial?: Filiais;

    // Relacionamento: Um usuário pode realizar várias aprovações
   
    @OneToMany(() => APROVACOES, (aprovacao) => aprovacao.usuario)
    aprovacoes?: APROVACOES[];


}
