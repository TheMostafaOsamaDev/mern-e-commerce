import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User as UserType, USER_REPOSITORY } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';
import { ADMIN_OTP } from 'src/config';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_REPOSITORY) private User: typeof UserType) {}

  async create(data: SignUpDto) {
    if (data.isAdmin) {
      if (!data.otp) {
        throw new BadRequestException('OTP is required');
      }

      const isMatch = await bcrypt.compare(data.otp, ADMIN_OTP);

      if (!isMatch) {
        throw new BadRequestException('Invalid OTP');
      }
    }

    const salt = bcrypt.genSaltSync(10);

    const [user, created] = await this.User.findOrCreate({
      where: { email: data.email },
      defaults: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        isAdmin: data.isAdmin,
        password: bcrypt.hashSync(data.password, salt),
      },
    });

    if (!created) {
      throw new BadRequestException('User already exists');
    }

    return {
      ...user.get(),
      password: undefined,
    };
  }

  async findOne(email: string) {
    return this.User.findOne({ where: { email } });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findOne(email);
    const isMatch = await bcrypt.compare(password, user?.password || '');

    if (user && isMatch) {
      return {
        ...user.get(),
        password: undefined,
      };
    }

    return null;
  }
}
