// src/obras-empreendimentos/obras-empreendimentos.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obras } from './entities/obras-empreendimento.entity';

@Injectable()
export class ObrasEmpreendimentosService {
  constructor(
    @InjectRepository(Obras)
    private readonly obrasRepository: Repository<Obras>,
  ) {}

  async create(dados: any) {
    const novaObra = this.obrasRepository.create(dados);
    return await this.obrasRepository.save(novaObra);
  }

  async findAll() {
    return await this.obrasRepository.find({
        relations: ['filiais', 'notas'] // Traz as filiais e as notas junto!
    });
  }

  async findOne(id: string) {
    const obra = await this.obrasRepository.findOne({
        where: { id },
        relations: ['filiais', 'notas']
    });

    if (!obra) {
        throw new NotFoundException(`Obra com ID ${id} não encontrada`);
    }
    return obra;
  }

  async update(id: string, dados: any) {
    await this.obrasRepository.update(id, dados);
  }

  async remove(id: string) {
    await this.obrasRepository.delete(id);
  }
}

// src/obras-empreendimentos/obras-empreendimentos.service.ts

// import { Injectable } from '@nestjs/common';
// import { CreateObrasEmpreendimentoDto } from './dto/create-obras-empreendimento.dto';
// import { UpdateObrasEmpreendimentoDto } from './dto/update-obras-empreendimento.dto';

// @Injectable()
// export class ObrasEmpreendimentosService {
//   create(createObrasEmpreendimentoDto: CreateObrasEmpreendimentoDto) {
//     return 'This action adds a new obrasEmpreendimento';
//   }

//   findAll() {
//     return `This action returns all obrasEmpreendimentos`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} obrasEmpreendimento`;
//   }

//   update(id: number, updateObrasEmpreendimentoDto: UpdateObrasEmpreendimentoDto) {
//     return `This action updates a #${id} obrasEmpreendimento`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} obrasEmpreendimento`;
//   }
// }
