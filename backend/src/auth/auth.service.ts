import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(BACKEND_SESSION_REPOSITORY)
    private Session: typeof BackendSession,
    @Inject(USER_REPOSITORY) private User: typeof UserModel,
    @Inject(ACCOUNT_REPOSITORY) private Account: typeof AccountModel,
    private jwtService: JwtService,
  ) {}

  async findUser(signInDto: SignInDto) {
    const account = await this.Account.findOne({
      include: [
        {
          model: UserModel,
          where: {
            email: signInDto.email,
          },
          attributes: ['id', 'email', 'pass'],
        },
      ],
      attributes: [],
    });

    if (account?.user?.pass) {
      const isMatch = bcrypt.compareSync(
        signInDto.password,
        account?.user?.pass,
      );

      if (!isMatch) {
        throw new UnauthorizedException('Invalid email or password');
      }

      const randomToken = crypto.randomBytes(64).toString('hex');

      const mainToken = this.jwtService.sign({
        email: account.user.email,
        id: account.user.id,
        secret: randomToken,
      });

      const clientToken = this.jwtService.sign({
        email: account.user.email,
        id: account.user.id,
        secret: randomToken,
      });

      await this.Session.create({
        userId: account.user.id,
        token: mainToken,
        secret: randomToken,
      });

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(clientToken, salt);

      return hash;
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
