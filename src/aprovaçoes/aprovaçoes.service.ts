// src/aprovaçoes/aprovaçoes.service.ts

import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APROVACOES } from './entities/aprovaçoe.entity';
import { Usuarios } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AprovaçoesService {
  constructor(
    @InjectRepository(APROVACOES)
    private readonly aprovacoesRepository: Repository<APROVACOES>,
    
    // Conectando o seu repositório de usuários para podermos verificar o cargo
    @InjectRepository(Usuarios)
    private readonly usuariosRepository: Repository<Usuarios>,
  ) {}

  async create(dados: any) { 
    
    // 1. Busca quem é o usuário que está tentando aprovar/comentar
    const usuario = await this.usuariosRepository.findOne({ 
        where: { id: dados.usuarioId } 
    });

    if (!usuario) {
        throw new NotFoundException('Usuário não encontrado no sistema!');
    }

    // 2. A BARREIRA DE SEGURANÇA
    // Se a pessoa enviou a decisão 1 (Aprovado) ou 2 (Reprovado)
    if (dados.decisao === 1 || dados.decisao === 2) {
        
        // Colocamos em minúsculo para evitar erros de digitação (ex: Admin vs admin)
        const cargoDaPessoa = usuario.perfil?.toLowerCase();

        // Se NÃO for diretoria e NÃO for admin, bloqueia na hora!
        if (cargoDaPessoa !== 'diretoria' && cargoDaPessoa !== 'admin') {
            throw new UnauthorizedException('Acesso Negado: Apenas Diretoria e Admin podem usar os status 1 (Aprovado) e 2 (Reprovado).');
        }
    }

    // 3. Tudo certo! Salva a aprovação (ou apenas a observação do Visualizador) no banco
    const novaAprovacao = this.aprovacoesRepository.create({
        decisao: dados.decisao,
        observacao: dados.observacao,
        usuario: { id: dados.usuarioId }, 
        nota: { id: dados.notaId }        
    });

    return await this.aprovacoesRepository.save(novaAprovacao);
  }

  async findAll() {
    return await this.aprovacoesRepository.find({
        relations: ['usuario', 'nota'] // Traz os dados do usuário e da nota junto
    });
  }

  async findOne(id: number) {
    const aprovacao = await this.aprovacoesRepository.findOne({ 
        where: { id },
        relations: ['usuario', 'nota']
    });
    
    if (!aprovacao) {
        throw new NotFoundException(`Aprovação com ID ${id} não encontrada`);
    }
    return aprovacao;
  }

  async update(id: number, dados: any) {
    await this.aprovacoesRepository.update(id, dados);
  }

  async remove(id: number) {
    await this.aprovacoesRepository.delete(id);
  }
}


// //aprovaçoes.service.ts

// import { Injectable } from '@nestjs/common';
// import { CreateAprovaçoeDto } from './dto/create-aprovaçoe.dto';
// import { UpdateAprovaçoeDto } from './dto/update-aprovaçoe.dto';

// @Injectable()
// export class AprovaçoesService {
//   create(createAprovaçoeDto: CreateAprovaçoeDto) {
//     return 'This action adds a new aprovaçoe';
//   }

//   findAll() {
//     return `This action returns all aprovaçoes`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} aprovaçoe`;
//   }

//   update(id: number, updateAprovaçoeDto: UpdateAprovaçoeDto) {
//     return `This action updates a #${id} aprovaçoe`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} aprovaçoe`;
//   }
// }
