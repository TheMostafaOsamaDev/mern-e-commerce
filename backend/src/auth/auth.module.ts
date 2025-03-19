import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config';
import { LocalStrategy } from 'src/strategies/local.strategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, LocalStrategy],
})
export class AuthModule {}
