import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { ADMIN_OTP } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    console.log(signInDto);

    const authToken = await this.authService.findUser(signInDto);

    res.cookie('auth', authToken, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
    });

    res.send({ message: 'Success' });
  }

  @Post('/check-otp')
  async checkOtp(@Body() body: { otp: string }) {
    try {
      return bcrypt.compare(body.otp, ADMIN_OTP);
    } catch (error) {
      return false;
    }
  }
}
