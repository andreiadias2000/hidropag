import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { LoginService } from './login.service'; 
import { RolesGuard } from '../common/guards/roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  const mockUsuariosService = {
    inserir: jest.fn(),
    listar: jest.fn(),
    buscarPorId: jest.fn(),
    alterar: jest.fn(),
    remove: jest.fn(),
  };

  const mockLoginService = {
    validarUsuario: jest.fn(),
    gerarToken: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: mockUsuariosService,
        },
        {
          provide: LoginService,
          useValue: mockLoginService,
        },
      ],
    })
      .overrideGuard(RolesGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = moduleRef.get<UsuariosController>(UsuariosController);
    service = moduleRef.get<UsuariosService>(UsuariosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('buscarTodos', () => {
    it('deve retornar uma lista de usuários com sucesso', async () => {
      const resultadoEsperado = [{ id: 1, nome: 'Ivan Silva', email: 'ivan@teste.com', ativo: true }];
      mockUsuariosService.listar.mockResolvedValue(resultadoEsperado);

      const resultado = await controller.buscarTodos();

      expect(resultado).toEqual(resultadoEsperado);
    });
  });

  describe('create', () => {
    it('deve chamar o método inserir do serviço com os dados do DTO', async () => {
      const dto: CreateUsuarioDto = {
        nome: 'Ivan Silva',
        email: 'ivan@teste.com',
        senha: 'Admin#2026',
        perfil: { id: '354ea3ae-2584-40dc-94df-fb2d3c71f105' }, // Alterado para o UUID string
      };

      const resultadoMock = { id: 1, ...dto, senha: 'senha_criptografada', ativo: true };
      mockUsuariosService.inserir.mockResolvedValue(resultadoMock);

      const resultado = await controller.criar(dto);

      expect(resultado).toEqual(resultadoMock);
    });
  });
});