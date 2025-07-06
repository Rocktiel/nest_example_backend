import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // React portu
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      // Aşağıdaki ayar çok önemli:
      stopAtFirstError: true, // Bu aktifse sadece ilk hatayı gösterir
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
