import {
  Controller,
  Get,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from './_base/response/base.response';
import { ResponseMessages } from './_common/enums/ResponseMessages.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    const users = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    return new BaseResponse(users, true, ResponseMessages.SUCCESS);
  }
}
