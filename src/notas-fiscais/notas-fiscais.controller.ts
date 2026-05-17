//notas-fiscais.controler.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res, StreamableFile, Put, UseGuards } from '@nestjs/common';
import { NotasFiscaisService } from './notas-fiscais.service';
import { Notas } from './entities/notas-fiscais.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('NOTAS') // Organiza no Swagger
@ApiBearerAuth('token-acesso')
@Controller('NOTAS')
@UseGuards(RolesGuard) // <--- ISSO PROTEGE O CONTROLLER INTEIRO!
export class NotasFiscaisController {
  
  constructor(private readonly notasFiscaisService: NotasFiscaisService) {}

  @Post()
  @ApiOperation({ summary: 'Lança uma nova nota fiscal com arquivo PDF' })
  @ApiConsumes('multipart/form-data') // CRÍTICO: Avisa que aceita arquivos
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' }, // Cria o botão de upload no Swagger
        numero_nf: { type: 'integer' },
        fornecedor: { type: 'string' },
        data_vencimento: { type: 'string', format: 'date' },
        valor_total: { type: 'number' },
        quant_parcelas: { type: 'integer' },
        status: { type: 'integer' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file')) 
  async criar(
    @Body() dados: Notas,
    @UploadedFile() file: Express.Multer.File
  ) {
    
    console.log('Arquivo recebido:', file);
    console.log('Dados recebidos:', dados);
    
    if (file) {
      // Atribui o buffer do arquivo PDF à entidade antes de salvar
      dados.arquivoPdf = file.buffer; 
    }
    
    return await this.notasFiscaisService.inserir(dados);
  }
@Get(':id/download')
@ApiOperation({ summary: 'Baixa o PDF da nota fiscal' })
async baixarPdf(@Param('id') id: string, @Res({ passthrough: true }) res: Response) {
  const nota = await this.notasFiscaisService.buscarPorId(id);

  if (!nota || !nota.arquivoPdf) {
    throw new BadRequestException('Nota não encontrada ou não possui PDF anexado.');
  }

  // Define o cabeçalho para o navegador entender que é um PDF
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="nota_${nota.numero_nf}.pdf"`,
  });

  // Retorna o Buffer como um arquivo baixável
  return new StreamableFile(nota.arquivoPdf);
}

  @Get()
  async buscarTodas() {
    return await this.notasFiscaisService.listar();
  }

  // Recebe o ID como string
  @Get(':id')
  async buscarUma(@Param('id') id: string) {
    return await this.notasFiscaisService.buscarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar nota fiscal (Requer Token)' })
  @UseGuards(RolesGuard) // Bloqueia o perfil 'leitor' de fazer alterações
  @ApiBody({
    description: 'Campos para atualização da Nota Fiscal (Envie apenas o que deseja alterar)',
    schema: {
      type: 'object',
      example: {
        numero: '123456',
        valor: 1500.85,
        dataEmissao: '2026-05-17',
        descricao: 'Prestação de serviços de manutenção hidropag',
        quantidadeParcelas: 3,        // <-- Novo campo adicionado
        status: 'Pendente'            // <-- Novo campo adicionado (ex: 'Pendente', 'Aprovado', 'Pago')
      }
    }
  })
  async atualizar(
    @Param('id') id: string, 
    @Body() nota: any // Mudamos para any para casar com o mapeamento estático do Swagger
  ) {
    return await this.notasFiscaisService.alterar(id, nota);
  }
  @Put(':id/upload-pdf')
  @ApiOperation({ summary: 'Substituir o arquivo PDF da nota fiscal (Requer Token)' })
  @UseGuards(RolesGuard) // Bloqueia o perfil 'leitor'
  @ApiConsumes('multipart/form-data') // Altera o tipo de conteúdo no Swagger para aceitar arquivo
  @UseInterceptors(FileInterceptor('file')) // Intercepta o campo 'file' enviado
  @ApiBody({
    description: 'Selecione o novo arquivo PDF da nota fiscal',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // Faz o Swagger exibir o botão de "Escolher arquivo"
        },
      },
    },
  })
  async atualizarPdf(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // Aqui você chama o seu serviço repassando o ID da nota e o buffer do arquivo (file.buffer)
    // Exemplo: return await this.notasFiscaisService.salvarPdf(id, file);
    return { msg: 'Arquivo PDF atualizado com sucesso!', nomeArquivo: file.originalname };
  }

  // Recebe o ID como string
  @Delete(':id')
  async remover(@Param('id') id: string) {
    return await this.notasFiscaisService.excluir(id);
  }
}
