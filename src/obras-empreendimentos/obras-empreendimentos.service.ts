<<<<<<< HEAD
=======
// src/obras-empreendimentos/obras-empreendimentos.service.ts

>>>>>>> main
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obras } from './entities/obras-empreendimento.entity';

@Injectable()
export class ObrasEmpreendimentosService {
  constructor(
    @InjectRepository(Obras)
<<<<<<< HEAD
    private readonly repository: Repository<Obras>,
  ) {}

  async inserir(dados: Obras): Promise<Obras> {
    return await this.repository.save(dados);
  }

  async listar(): Promise<Obras[]> {
    return await this.repository.find({
      relations: ['filial', 'notas'], // Traz a filial e as notas da obra[cite: 13]
    });
  }

  async buscarPorId(id: string): Promise<Obras> {
    const obra = await this.repository.findOne({
      where: { id: id as any },
      relations: ['filial', 'notas'],
    });

    if (!obra) {
      throw new NotFoundException(`Obra com ID ${id} não encontrada`);
=======
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
>>>>>>> main
    }
    return obra;
  }

<<<<<<< HEAD
  async alterar(id: string, dados: Partial<Obras>): Promise<void> {
    const existe = await this.buscarPorId(id);
    if (existe) {
      await this.repository.update(id, dados);
    }
  }

  async excluir(id: string): Promise<void> {
    const existe = await this.buscarPorId(id);
    if (existe) {
      await this.repository.delete(id);
    }
  }
}
=======
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
>>>>>>> main
