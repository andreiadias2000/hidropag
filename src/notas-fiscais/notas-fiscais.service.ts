<<<<<<< HEAD
// notas-fiscais.service.ts
=======
// src/notas-fiscais/notas-fiscais.service.ts

>>>>>>> main
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notas } from './entities/notas-fiscais.entity';

@Injectable()
export class NotasFiscaisService {
  constructor(
    @InjectRepository(Notas)
<<<<<<< HEAD
    private readonly repository: Repository<Notas>,
  ) {}

  // Criar uma nota
  // async inserir(nota: Notas): Promise<Notas> {
  //   return await this.repository.save(nota);
  // }
  async inserir(dados: Notas) {
  const novaNota = this.repository.create(dados); // O create garante que o buffer seja mantido
  return await this.repository.save(dados);
}

  // Listar todas com a Obra vinculada
  async listar(): Promise<Notas[]> {
    return await this.repository.find({
      relations: ['obra'], // Traz os dados da obra vinculada
    });
  }

  // Buscar por ID
  async buscarPorId(id: string): Promise<Notas> {
    const nota = await this.repository.findOne({
      where: { id: id as any }, // Ajuste caso seu ID seja UUID
      relations: ['obra', 'aprovacoes'],
    });

    if (!nota) {
      throw new NotFoundException(`Nota Fiscal com ID ${id} não encontrada`);
    }
    return nota;
  }

  // Atualizar (Patch/Put)
  async alterar(id: string, dados: Partial<Notas>): Promise<void> {
    const notaExiste = await this.buscarPorId(id);
    if (notaExiste) {
      await this.repository.update(id, dados);
    }
  }

  // Excluir
  async excluir(id: string): Promise<void> {
    const notaExiste = await this.buscarPorId(id);
    if (notaExiste) {
      await this.repository.delete(id);
    }
  }
}
=======
    private readonly notasRepository: Repository<Notas>,
  ) {}

  async create(dados: any) {
    const novaNota = this.notasRepository.create({
        ...dados,
        obra: dados.obraId ? { id: dados.obraId } : null
    });
    
    return await this.notasRepository.save(novaNota);
  }

  async findAll() {
    return await this.notasRepository.find({
        relations: ['obra', 'aprovacoes'] 
    });
  }

  // ID alterado para string aqui
  async findOne(id: string) {
    const nota = await this.notasRepository.findOne({
        where: { id },
        relations: ['obra', 'aprovacoes']
    });

    if (!nota) {
        throw new NotFoundException(`Nota Fiscal com ID ${id} não encontrada`);
    }
    return nota;
  }

  // ID alterado para string aqui
  async update(id: string, dados: any) {
    await this.notasRepository.update(id, dados);
  }

  // ID alterado para string aqui
  async remove(id: string) {
    await this.notasRepository.delete(id);
  }
}

// src/notas-fiscais/notas-fiscais.service.ts

// import { Injectable } from '@nestjs/common';
// import { CreateNotasFiscaiDto } from './dto/create-notas-fiscai.dto';
// import { UpdateNotasFiscaiDto } from './dto/update-notas-fiscai.dto';

// @Injectable()
// export class NotasFiscaisService {
//   create(createNotasFiscaiDto: CreateNotasFiscaiDto) {
//     return 'This action adds a new notasFiscai';
//   }

//   findAll() {
//     return `This action returns all notasFiscais`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} notasFiscai`;
//   }

//   update(id: number, updateNotasFiscaiDto: UpdateNotasFiscaiDto) {
//     return `This action updates a #${id} notasFiscai`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} notasFiscai`;
//   }
// }
>>>>>>> main
