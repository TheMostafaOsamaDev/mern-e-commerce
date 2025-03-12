import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './better-auth/auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  // app.use('/api/auth/*', toNodeHandler(auth));
  app.use(/^\/api\/auth\/.*/, toNodeHandler(auth));

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
