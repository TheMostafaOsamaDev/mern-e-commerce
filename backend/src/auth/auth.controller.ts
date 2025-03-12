import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import { ADMIN_OTP } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/check-otp')
  async checkOtp(@Body() body: { otp: string }) {
    try {
      return bcrypt.compare(body.otp, ADMIN_OTP);
    } catch (error) {
      return false;
    }
  }
}
