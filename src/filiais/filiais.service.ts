import { Injectable } from '@nestjs/common';
import { CreateFiliaiDto } from './dto/create-filiai.dto';
import { UpdateFiliaiDto } from './dto/update-filiai.dto';

@Injectable()
export class FiliaisService {
  create(createFiliaiDto: CreateFiliaiDto) {
    return 'This action adds a new filiai';
  }

  findAll() {
    return `This action returns all filiais`;
  }

  findOne(id: number) {
    return `This action returns a #${id} filiai`;
  }

  update(id: number, updateFiliaiDto: UpdateFiliaiDto) {
    return `This action updates a #${id} filiai`;
  }

  remove(id: number) {
    return `This action removes a #${id} filiai`;
  }
}
