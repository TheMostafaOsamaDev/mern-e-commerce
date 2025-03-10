import { Inject, Injectable } from '@nestjs/common';
import {
  BACKEND_SESSION_REPOSITORY,
  BackendSession,
} from './models/backend-session.model';
import { User as UserModel } from './models/user.model';
import { USER_REPOSITORY } from './models/user.model';
import { SignInDto } from './dto/sign-in.dto';
import {
  Account as AccountModel,
  ACCOUNT_REPOSITORY,
} from './models/account.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(BACKEND_SESSION_REPOSITORY)
    private Session: typeof BackendSession,
    @Inject(USER_REPOSITORY) private User: typeof UserModel,
    @Inject(ACCOUNT_REPOSITORY) private Account: typeof AccountModel,
  ) {}

  async findUser(signInDto: SignInDto) {}
}
