import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuarios } from './entities/usuario.entity';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuarios])], // Permite o uso do Repository[cite: 5]
  controllers: [UsuariosController],
  providers: [UsuariosService, LoginService],
})
export class UsuariosModule {}