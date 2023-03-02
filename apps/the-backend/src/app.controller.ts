import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppHelloResponse, test } from 'api-client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppHelloResponse {
    test('ka buim');
    return { data: this.appService.getHello() };
  }
}
