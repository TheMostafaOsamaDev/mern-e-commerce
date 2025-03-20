import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './entities/user.entity';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
