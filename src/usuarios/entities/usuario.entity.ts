// // usuario.entity.ts
// import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, } from "typeorm";
// import { Filiais } from "../../filiais/entities/filiais.entity";
// import { APROVACOES } from "../../aprovaçoes/entities/aprovaçoe.entity";

// @Entity()
// export class Usuarios{
//     @PrimaryGeneratedColumn()
//     id?: number;

//     @Column()
//     nome?: string 

//     @Column()
//     email?: string;

//     @Column()
//     senha?: number
    
//     @Column()
//     perfil?: string

//     // Relacionamento: Muitos usuários trabalham em uma Filial
//     @ManyToOne(() => Filiais, (filial) => filial.usuarios)
//     filial?: Filiais;

//     // Relacionamento: Um usuário pode realizar várias aprovações
//     @OneToMany(() => APROVACOES, (aprovacao) => aprovacao.usuario)
//     aprovacoes?: APROVACOES[];


// }

// usuario.entity.ts
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  OneToMany, 
  ManyToMany, 
  JoinTable 
} from "typeorm";
import { Filiais } from "../../filiais/entities/filiais.entity";
import { APROVACOES } from "../../aprovaçoes/entities/aprovaçoe.entity";

// 1. A LISTA DOS CARGOS/PERFIL
export enum PerfilUsuario {
  ADMIN_MASTER = 'admin_master', // Pode tudo e vê todas as filiais
  DIRETORIA = 'diretoria',       // Vê filiais permitidas e autoriza pagamentos
  FINANCEIRO = 'financeiro',     // Vê filiais permitidas, lança contas, mas não autoriza
  OPERADOR = 'operador',         // Lança notas e vê apenas as filiais permitidas
  VISUALIZADOR = 'visualizador', // Apenas visualiza as filiais permitidas e adiciona comentários
}

@Entity('usuarios')
export class Usuarios {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string;

    @Column()
    email?: string;

    @Column()
    senha?: number;
    
    // APLICANDO A TRAVA DO PERFIL
    @Column({
        type: 'enum',
        enum: PerfilUsuario,
        default: PerfilUsuario.VISUALIZADOR, 
    })
    perfil?: PerfilUsuario;

    // 3. Muitos para Muitos
    // Relacionamento: Um usuário pode acessar várias Filiais
    @ManyToMany(() => Filiais)
    @JoinTable({
        name: 'usuario_filial_acesso', 
        joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'filial_id', referencedColumnName: 'id' },
    })
    filiaisPermitidas?: Filiais[]; 

    // Relacionamento: Um usuário pode realizar várias aprovações
    @OneToMany(() => APROVACOES, (aprovacao) => aprovacao.usuario)
    aprovacoes?: APROVACOES[];
}