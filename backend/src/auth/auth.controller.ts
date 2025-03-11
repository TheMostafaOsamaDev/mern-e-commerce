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

  @Delete('/sign-out')
  async signOut(@Req() req: Request, @Res() res: Response) {
    const authToken = req.cookies['auth'];

    if (!authToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    await this.authService.signOut(authToken);

    res.cookie('auth', '', {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(0),
    });

    res.send({ message: 'Success' });
  }
}
