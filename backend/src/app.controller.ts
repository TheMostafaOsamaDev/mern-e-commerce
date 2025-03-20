import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(@Req() req: Request) {
    const otp = '123456';

    const salt = bcrypt.genSaltSync(10);

    const hash = await bcrypt.hash(otp, salt);

    console.log(hash);

    return hash;
  }
}
