import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './models/user.model';
import { backendSessionProviders } from './models/backend-session.model';
import { accountProviders } from './models/account.model';
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
  providers: [
    AuthService,
    ...userProviders,
    ...backendSessionProviders,
    ...accountProviders,
  ],
})
export class AuthModule {}
