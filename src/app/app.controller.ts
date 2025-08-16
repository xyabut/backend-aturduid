import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('register')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(): string {
    return this.appService.login();
  }
}
