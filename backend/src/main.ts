import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { Sequelize } from 'sequelize';
import session from 'express-session';
import connectSessionSequelize from 'connect-session-sequelize';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(new ValidationPipe());

  const sequelize = app.get<Sequelize>('SEQUELIZE');

  // Create SequelizeStore by passing the express-session Store
  const SequelizeStore = connectSessionSequelize(session.Store);

  // Then you can use it like this (if needed):
  const sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Session',
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  // If you're using sessions, add this:
  app.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
