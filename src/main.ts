import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do DocumentBuilder
  const config = new DocumentBuilder()
    .setTitle('Sistema de Engenharia Clínica e Obras')
    .setDescription('API para gestão de notas fiscais, filiais e usuários')
    .setVersion('1.0')
    .addBearerAuth() // ESSENCIAL: Adiciona o campo para colocar o Token JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A rota será http://localhost:3000/api

  await app.listen(3000);
}
bootstrap();