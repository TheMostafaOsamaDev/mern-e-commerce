import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'secret',
      store: MongoStore.create({
        mongoUrl:
          process.env.SESSION_DB || 'mongodb://localhost:27017/users_sessions',
        collectionName: 'sessions', // The collection where sessions are stored
        ttl: 24 * 60 * 60, // Sessions expire after 1 day
        autoRemove: 'native', // Auto remove expired sessions
      }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
