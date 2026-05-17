import { Test, TestingModule } from '@nestjs/testing';
import { FiliaisService } from './filiais.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Filiais } from './entities/filiais.entity';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateFilialDto } from './dto/create-filiais.dto';

describe('FiliaisService', () => {
  let service: FiliaisService;
  let repository: Repository<Filiais>;

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FiliaisService,
        {
          provide: getRepositoryToken(Filiais),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FiliaisService>(FiliaisService);
    repository = module.get<Repository<Filiais>>(getRepositoryToken(Filiais));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('inserir', () => {
    it('deve cadastrar uma nova filial com sucesso', async () => {
      const dto: CreateFilialDto = { nome: 'Filial Centro', cidade: 'Porto Alegre' };
      const resultadoEsperado = { id: 'uuid-123', ...dto };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(resultadoEsperado);
      mockRepository.save.mockResolvedValue(resultadoEsperado);

      const resultado = await service.inserir(dto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { nome: dto.nome } });
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(resultadoEsperado);
      expect(resultado).toEqual(resultadoEsperado);
    });

    it('deve lançar BadRequestException se o nome já estiver cadastrado', async () => {
      const dto: CreateFilialDto = { nome: 'Filial Existente', cidade: 'Porto Alegre' };
      mockRepository.findOne.mockResolvedValue({ id: 'uuid-existente', ...dto });

      await expect(service.inserir(dto)).rejects.toThrow(BadRequestException);
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('listar', () => {
    it('deve retornar uma lista de filiais incluindo suas relacoes', async () => {
      const listaFiliais = [{ id: '1', nome: 'Filial POA', obras: [], usuarios: [] }];
      mockRepository.find.mockResolvedValue(listaFiliais);

      const resultado = await service.listar();

      expect(repository.find).toHaveBeenCalledWith({ relations: ['obras', 'usuarios'] });
      expect(resultado).toEqual(listaFiliais);
    });
  });

  describe('buscarPorId', () => {
    it('deve retornar uma filial encontrada pelo ID', async () => {
      const filial = { id: 'uuid-valido', nome: 'Filial POA', obras: [], usuarios: [] };
      mockRepository.findOne.mockResolvedValue(filial);

      const resultado = await service.buscarPorId('uuid-valido');

      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: 'uuid-valido' },
        relations: ['obras', 'usuarios'],
      });
      expect(resultado).toEqual(filial);
    });

    it('deve lançar NotFoundException caso a filial nao exista', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.buscarPorId('uuid-invalido')).rejects.toThrow(NotFoundException);
    });
  });

  describe('alterar', () => {
    it('deve atualizar os dados da filial com sucesso', async () => {
      const filialExistente = { id: 'uuid-valido', nome: 'Nome Antigo', deletedAt: null };
      const dadosNovos = { nome: 'Nome Novo' };

      mockRepository.findOne.mockResolvedValue(filialExistente);
      mockRepository.findOne.mockResolvedValueOnce(filialExistente).mockResolvedValueOnce(null);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.alterar('uuid-valido', dadosNovos);

      expect(repository.update).toHaveBeenCalledWith('uuid-valido', dadosNovos);
    });

    it('deve lançar BadRequestException se tentar alterar o nome para um já existente em outra filial', async () => {
      const filialExistente = { id: 'uuid-1', nome: 'Minha Filial', deletedAt: null };
      const outraFilial = { id: 'uuid-2', nome: 'Nome Ocupado', deletedAt: null };
      const dadosNovos = { nome: 'Nome Ocupado' };

      mockRepository.findOne.mockResolvedValueOnce(filialExistente).mockResolvedValueOnce(outraFilial);

      await expect(service.alterar('uuid-1', dadosNovos)).rejects.toThrow(BadRequestException);
      expect(repository.update).not.toHaveBeenCalled();
    });

    it('deve lançar NotFoundException caso a filial a ser alterada nao exista', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.alterar('uuid-invalido', { nome: 'Teste' })).rejects.toThrow(NotFoundException);
    });
  });
});