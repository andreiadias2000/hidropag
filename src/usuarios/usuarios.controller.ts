// src/usuarios/usuarios.controller.ts
import { Controller, Get, Post, Delete, Body, Put, Param, Res, HttpStatus } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuarios } from './entities/usuario.entity';
import { LoginService } from './login.service'; // 1. Importe o novo service
import * as express from 'express';

@Controller('usuarios')
export class UsuariosController {
  
  // 2. Adicione o loginService aqui no constructor
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly loginService: LoginService 
  ) {}

  // 3. Nova rota de Login
  @Post('login')
  async login(@Body() body: any, @Res() res: express.Response) {
    try {
      const { email, senha } = body;

      // 1. Chamar o serviço para validar e gerar o token
      const token = await this.loginService.verificarLogin(email, senha);
      
      //2  Retorna o token com status 200
      return res.status(HttpStatus.OK).json({
        auth: true,
        token: token
      });
    } catch (err: any) {
      console.error("ERRO NO LOGIN:", err); // Olhe o terminal após tentar logar!

      // Se o erro vier do seu LoginService (com id e msg)
      if (err.id && err.msg) {
        return res.status(err.id).json({ erro: err.msg });
      }

      // Caso seja um erro inesperado (ex: banco fora do ar ou erro de sintaxe)
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        erro: err.message || 'Erro interno no servidor'
      });
    }
  }

  @Post()
  async criar(@Body() usuario: Usuarios): Promise<Usuarios> {
    return await this.usuariosService.inserir(usuario);
  }

  @Get()
  async buscarTodos(): Promise<Usuarios[]> {
    return await this.usuariosService.listar();
  }

  @Get(':id')
  async buscarUm(@Param('id') id: number): Promise<Usuarios> {
    return await this.usuariosService.buscarPorId(id);
  }

  @Put(':id')
  async atualizar(@Param('id') id: number, @Body() usuario: Usuarios): Promise<void> {
    await this.usuariosService.alterar(id, usuario);
  }
  @Delete(':id')
  async deletar(@Param('id') id: number): Promise<void>{
    return await this.usuariosService.excluir(id)
  }
}

