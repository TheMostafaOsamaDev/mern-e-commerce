import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { ADMIN_OTP } from 'src/config';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalGuard } from 'src/guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto) {
    const user = await this.authService.create(body);

    return user;
  }

  @Post('/check-otp')
  async checkOtp(@Body() body: { otp: string }) {
    try {
      return bcrypt.compare(body.otp, ADMIN_OTP);
    } catch (error) {
      return false;
    }
  }

  @UseGuards(LocalGuard)
  @Post('/sign-in')
  async signIn(@Req() req: Request) {
    return req.user;
  }
}
