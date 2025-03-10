import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from './models/user.model';
import { backendSessionProviders } from './models/backend-session.model';
import { accountProviders } from './models/account.model';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    ...userProviders,
    ...backendSessionProviders,
    ...accountProviders,
  ],
})
export class AuthModule {}
