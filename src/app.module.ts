import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source'; 

// Importação dos Módulos
import { FiliaisModule } from './filiais/filiais.module';
import { UsuariosModule } from './usuarios/usuarios.module'; 
<<<<<<< HEAD
import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';
=======
import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';
import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
>>>>>>> main
import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';

@Module({
  imports: [
    // Puxando as configurações do data-source
    TypeOrmModule.forRoot(AppDataSource.options), 
    
    // Lista de todos os módulos ativos no sistema
    FiliaisModule,
<<<<<<< HEAD
    UsuariosModule,
    NotasFiscaisModule,
    AprovaçoesModule,
    ObrasEmpreendimentosModule, // Removi a duplicata do FiliaisModule que estava aqui embaixo
=======
    UsuariosModule, 
    AprovaçoesModule,
    NotasFiscaisModule,
    ObrasEmpreendimentosModule,
>>>>>>> main
  ],
})
export class AppModule {}