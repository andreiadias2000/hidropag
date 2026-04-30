import { Injectable } from '@nestjs/common';
import { CreateNotasFiscaiDto } from './dto/create-notas-fiscai.dto';
import { UpdateNotasFiscaiDto } from './dto/update-notas-fiscai.dto';

@Injectable()
export class NotasFiscaisService {
  create(createNotasFiscaiDto: CreateNotasFiscaiDto) {
    return 'This action adds a new notasFiscai';
  }

  findAll() {
    return `This action returns all notasFiscais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notasFiscai`;
  }

  update(id: number, updateNotasFiscaiDto: UpdateNotasFiscaiDto) {
    return `This action updates a #${id} notasFiscai`;
  }

  remove(id: number) {
    return `This action removes a #${id} notasFiscai`;
  }
}
