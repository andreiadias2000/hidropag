// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { UsuariosModule } from './usuarios/usuarios.module';
// import { FiliaisModule } from './filiais/filiais.module';
// import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';
// import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
// import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';

// @Module({
//   imports: [UsuariosModule, FiliaisModule, ObrasEmpreendimentosModule, NotasFiscaisModule, AprovaçoesModule],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source'; 

// Importação dos Módulos
import { FiliaisModule } from './filiais/filiais.module';
import { UsuariosModule } from './usuarios/usuarios.module'; 
import { AprovaçoesModule } from './aprovaçoes/aprovaçoes.module';
import { NotasFiscaisModule } from './notas-fiscais/notas-fiscais.module';
import { ObrasEmpreendimentosModule } from './obras-empreendimentos/obras-empreendimentos.module';

@Module({
  imports: [
    // Puxando as configurações do data-source
    TypeOrmModule.forRoot(AppDataSource.options), 
    
    // Lista de todos os módulos ativos no sistema
    FiliaisModule,
    UsuariosModule, 
    AprovaçoesModule,
    NotasFiscaisModule,
    ObrasEmpreendimentosModule,
  ],
})
export class AppModule {}