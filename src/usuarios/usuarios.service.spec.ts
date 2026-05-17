import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuarios } from './entities/usuario.entity';
import { Perfil } from '../perfil/entities/perfil.entity'; 
import { HashService } from '../common/middlewares/hash.service';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let usuariosRepository: Repository<Usuarios>;
  let perfilRepository: Repository<Perfil>;

  const mockUsuariosRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockPerfilRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockHashService = {
    gerarHash: jest.fn().mockResolvedValue('senha_criptografada'),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: getRepositoryToken(Usuarios),
          useValue: mockUsuariosRepository,
        },
        {
          provide: getRepositoryToken(Perfil),
          useValue: mockPerfilRepository,
        },
        {
          provide: HashService,
          useValue: mockHashService,
        },
      ],
    }).compile();

    service = moduleRef.get<UsuariosService>(UsuariosService);
    usuariosRepository = moduleRef.get<Repository<Usuarios>>(getRepositoryToken(Usuarios));
    perfilRepository = moduleRef.get<Repository<Perfil>>(getRepositoryToken(Perfil));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(usuariosRepository).toBeDefined();
    expect(perfilRepository).toBeDefined();
  });

  describe('listar', () => {
    it('deve retornar uma lista de usuários com sucesso', async () => {
      const resultadoEsperado = [{ id: 1, nome: 'Ivan Silva', email: 'ivan@teste.com', ativo: true }];
      mockUsuariosRepository.find.mockResolvedValue(resultadoEsperado);

      const resultado = await service.listar();

      expect(resultado).toEqual(resultadoEsperado);
      expect(mockUsuariosRepository.find).toHaveBeenCalled();
    });
  });

  describe('inserir', () => {
    it('deve cadastrar um novo usuário com sucesso', async () => {
      const dto: CreateUsuarioDto = {
        nome: 'Ivan Silva',
        email: 'ivan@teste.com',
        senha: 'Admin#2026',
        perfil: { id: '354ea3ae-2584-40dc-94df-fb2d3c71f105' }, // Alterado para o UUID string
      };

      const usuarioSalvo = { 
        id: 1, 
        nome: dto.nome, 
        email: dto.email, 
        senha: 'senha_criptografada', 
        ativo: true,
        perfil: { id: '354ea3ae-2584-40dc-94df-fb2d3c71f105' } // Alterado para o UUID string
      };

      mockUsuariosRepository.findOne.mockResolvedValue(null);
      mockHashService.gerarHash.mockResolvedValue('senha_criptografada');
      mockUsuariosRepository.create.mockReturnValue(usuarioSalvo);
      mockUsuariosRepository.save.mockResolvedValue(usuarioSalvo);

      const resultado = await service.inserir(dto);

      expect(resultado).toEqual(usuarioSalvo);
      expect(mockUsuariosRepository.findOne).toHaveBeenCalledWith({ where: { email: dto.email } });
    });

    it('deve lançar BadRequestException se o e-mail já estiver cadastrado', async () => {
      const dto: CreateUsuarioDto = {
        nome: 'Ivan Silva',
        email: 'ivan@teste.com',
        senha: 'Admin#2026',
        perfil: { id: '354ea3ae-2584-40dc-94df-fb2d3c71f105' }, // Alterado para o UUID string
      };

      mockUsuariosRepository.findOne.mockResolvedValue({ id: 1, email: 'ivan@teste.com' });

      await expect(service.inserir(dto)).rejects.toThrow(BadRequestException);
    });
  });
});