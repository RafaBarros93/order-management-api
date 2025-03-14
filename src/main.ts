import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Order Management API') // Título da API
    .setDescription('API para gerenciamento de pedidos e produtos') // Descrição
    .setVersion('1.0') // Versão da API
    .addTag('products') // Tag para agrupar endpoints relacionados
    .addTag('orders') // Tag para agrupar endpoints relacionados
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota para acessar o Swagger UI

  await app.listen(3000);
}
bootstrap();