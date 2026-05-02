import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuarios } from './entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuarios)
    private readonly repository: Repository<Usuarios>,
  ) {}

  async inserir(usuario: Usuarios): Promise<Usuarios> {
    if (!usuario || !usuario.email || !usuario.senha) {
      throw new BadRequestException("Falta dados obrigatorios");
    }
    return await this.repository.save(usuario);
  }

  async listar(): Promise<Usuarios[]> {
    return await this.repository.find({
      relations: ['filial'],
    });
  }

  async buscarPorId(id: number): Promise<Usuarios> {
    const usuario = await this.repository.findOne({
      where: { id },
      relations: ['filial', 'aprovacoes'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async alterar(id: number, usuario: Usuarios): Promise<void> {
    const usuarioExiste = await this.buscarPorId(id);
    if (usuarioExiste) {
      await this.repository.update(id, usuario);
    }
  }

  async excluir(id: number): Promise<void> {
    const usuarioExiste = await this.buscarPorId(id);
    if (usuarioExiste) {
      await this.repository.delete(id);
    }
  }
}