import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { test } from 'api-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    test('ka buim');
    return this.appService.getHello();
  }
}
