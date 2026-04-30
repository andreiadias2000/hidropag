import { Injectable } from '@nestjs/common';
import { CreateObrasEmpreendimentoDto } from './dto/create-obras-empreendimento.dto';
import { UpdateObrasEmpreendimentoDto } from './dto/update-obras-empreendimento.dto';

@Injectable()
export class ObrasEmpreendimentosService {
  create(createObrasEmpreendimentoDto: CreateObrasEmpreendimentoDto) {
    return 'This action adds a new obrasEmpreendimento';
  }

  findAll() {
    return `This action returns all obrasEmpreendimentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obrasEmpreendimento`;
  }

  update(id: number, updateObrasEmpreendimentoDto: UpdateObrasEmpreendimentoDto) {
    return `This action updates a #${id} obrasEmpreendimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} obrasEmpreendimento`;
  }
}
