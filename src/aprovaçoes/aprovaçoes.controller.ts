import { Controller, Get, Post, Body, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { AprovaçoesService } from './aprovaçoes.service';
import { APROVACOES } from './entities/aprovaçoe.entity';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../common/guards/roles.guard';



@ApiTags('APROVACOES')
@Controller('APROVACOES') // Rota: http://localhost:3000/APROVACOES
@ApiBearerAuth('token-acesso')
@UseGuards(RolesGuard) // <--- ISSO PROTEGE O CONTROLLER INTEIRO!
export class AprovaçoesController {
  
  constructor(private readonly aprovaçoesService: AprovaçoesService) {}

  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        decisao: { type: 'number', example: '1 aprovado 2 aguardando aprovação' },
        observacao: { type: 'string', example: 'Nota aprovada' },
        nota: { 
          type: 'object', 
          properties: { id: { type: 'string', example: 'uuid-da-nota-aqui' } } 
        },
        usuario: { 
          type: 'object', 
          properties: { id: { type: 'number', example: 'uuid-do-usuario' } }
        }
      }
    }
  })
  async criar(@Body() aprovacao: APROVACOES) {
    return await this.aprovaçoesService.inserir(aprovacao);
  }

  @Get()
  async buscarTodas() {
    return await this.aprovaçoesService.listar();
  }

  @Get(':id')
  async buscarUma(@Param('id') id: string) {
    return await this.aprovaçoesService.buscarPorId(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar/Dar parecer em uma aprovação (Requer Token)' })
  @UseGuards(RolesGuard) // Garante que o perfil 'leitor' será bloqueado aqui
  @ApiBody({
    description: 'Campos para atualização da Aprovação (Altere o status ou adicione observações)',
    schema: {
      type: 'object',
      example: {
        status: 'Decisão: 1 para Aprovado, 2 para Reprovado', // Exemplos: 'Pendente', 'Aprovado', 'Rejeitado'
        observacao: 'Nota fiscal conferida e liberada para pagamento.',
        dataAnalise: '2026-05-17'
      }
    }
  })
  
  async alterar(
    @Param('id') id: string, // Ajuste para 'number' caso o ID desta tabela não seja UUID
    @Body() dadosAprovacao: any
  ): Promise<any> {
    // Chama o método correspondente do seu service (pode ser 'alterar', 'atualizar' ou 'update')
    return await this.aprovaçoesService.alterar(id, dadosAprovacao);
  }
  
  @Delete(':id')
  async remover(@Param('id') id: string) {
    return await this.aprovaçoesService.excluir(id);
  }
}
