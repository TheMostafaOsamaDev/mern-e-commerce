import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './entities/user.entity';
import { accountProviders } from './entities/account.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...userProviders, ...accountProviders],
})
export class AuthModule {}
