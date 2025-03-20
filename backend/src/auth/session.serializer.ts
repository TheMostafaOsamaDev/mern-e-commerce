import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { USER_REPOSITORY, User as UserType } from './entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(@Inject(USER_REPOSITORY) private User: typeof UserType) {
    super();
  }

  serializeUser(user: UserType, done: Function) {
    done(null, {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  async deserializeUser(id: string, done: Function) {
    const user = await this.User.findOne({ where: { id } });
    done(null, user || null);
  }
}
