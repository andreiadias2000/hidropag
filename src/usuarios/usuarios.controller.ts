import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
  
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async criar(@Body() usuario: Usuarios): Promise<Usuarios> {
    // Chama o método 'inserir' do seu Service
    return await this.usuariosService.inserir(usuario);
  }

  @Get()
  async buscarTodos(): Promise<Usuarios[]> {
    // Chama o método 'listar' do seu Service[cite: 5]
    return await this.usuariosService.listar();
  }

  @Get(':id')
  async buscarUm(@Param('id') id: number): Promise<Usuarios> {
    // Chama o método 'buscarPorId' do seu Service[cite: 5]
    return await this.usuariosService.buscarPorId(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: number, @Body() usuario: Usuarios): Promise<void> {
    // Chama o método 'alterar' do seu Service[cite: 5]
    await this.usuariosService.alterar(id, usuario);
  }

  @Delete(':id')
  async remover(@Param('id') id: number): Promise<void> {
    // Chama o método 'excluir' do seu Service[cite: 5]
    await this.usuariosService.excluir(id);
  }
}