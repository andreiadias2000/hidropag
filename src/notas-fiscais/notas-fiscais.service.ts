// src/notas-fiscais/notas-fiscais.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notas } from './entities/notas-fiscais.entity';

@Injectable()
export class NotasFiscaisService {
  constructor(
    @InjectRepository(Notas)
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
