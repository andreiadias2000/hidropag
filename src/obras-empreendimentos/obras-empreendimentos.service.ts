//src/obras-empreendimentos/obras-empreendimentos.ts


import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obras } from './entities/obras-empreendimento.entity';
import { CreateObrasEmpreendimentoDto } from './dto/create-obras-empreendimento.dto';
import { Filiais } from '../filiais/entities/filiais.entity'; // Importamos a entidade da Filial

@Injectable()
export class ObrasEmpreendimentosService {
  constructor(
    @InjectRepository(Obras)
    private readonly repository: Repository<Obras>,
    
    // repositório de Filiais para poder consultá-lo
    @InjectRepository(Filiais)
    private readonly filiaisRepository: Repository<Filiais>,
  ) {}

  async inserir(dados: CreateObrasEmpreendimentoDto): Promise<Obras> {
    // 1. VALIDAÇÃO DE FILIAL: Verifica se a filial informada realmente existe la no banco
    const filialExiste = await this.filiaisRepository.findOne({
      where: { id: dados.filial.id },
    });

    if (!filialExiste) {
      throw new NotFoundException(`A filial informada (ID: ${dados.filial.id}) não existe no sistema.`);
    }

    // 2. VALIDAÇÃO DE DUPLICIDADE: Verifica se o nome da obra já está em uso
    const obraExiste = await this.repository.findOne({
      where: { nome_obra: dados.nome_obra },
    });

    if (obraExiste) {
      throw new BadRequestException(`A obra "${dados.nome_obra}" já está cadastrada.`);
    }

    // 3. SALVA NO BANCO: Como a filial existe e o nome é novo, cria e salva a obra
    const novaObra = this.repository.create({
      nome_obra: dados.nome_obra,
      filial: filialExiste, // a entidade da filial encontrada foi para o TypeORM fazer o vínculo
    });

    return await this.repository.save(novaObra);
  }

  async listar(): Promise<Obras[]> {
    return await this.repository.find({
      relations: ['filial', 'notas'], // nem mexi
    });
  }

  async buscarPorId(id: string): Promise<Obras> {
    const obra = await this.repository.findOne({
      where: { id: id as any },
      relations: ['filial', 'notas'], // tambem nao mexi
    });

    if (!obra) {
      throw new NotFoundException(`Obra com ID ${id} não encontrada`);
    }
    return obra;
  }

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


// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Obras } from './entities/obras-empreendimento.entity';

// @Injectable()
// export class ObrasEmpreendimentosService {
//   constructor(
//     @InjectRepository(Obras)
//     private readonly repository: Repository<Obras>,
//   ) {}

//   async inserir(dados: Obras): Promise<Obras> {
//     return await this.repository.save(dados);
//   }

//   async listar(): Promise<Obras[]> {
//     return await this.repository.find({
//       relations: ['filial', 'notas'], // Traz a filial e as notas da obra[cite: 13]
//     });
//   }

//   async buscarPorId(id: string): Promise<Obras> {
//     const obra = await this.repository.findOne({
//       where: { id: id as any },
//       relations: ['filial', 'notas'],
//     });

//     if (!obra) {
//       throw new NotFoundException(`Obra com ID ${id} não encontrada`);
//     }
//     return obra;
//   }

//   async alterar(id: string, dados: Partial<Obras>): Promise<void> {
//     const existe = await this.buscarPorId(id);
//     if (existe) {
//       await this.repository.update(id, dados);
//     }
//   }

//   async excluir(id: string): Promise<void> {
//     const existe = await this.buscarPorId(id);
//     if (existe) {
//       await this.repository.delete(id);
//     }
//   }
// }
