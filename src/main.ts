import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      // Retornar propriedades que existem no DTO
      whitelist: true,
      // Não permitir valores fora do DTO
      forbidNonWhitelisted: true,
      // Transformar os dados que chegam no tipo do DTO
      transform: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
