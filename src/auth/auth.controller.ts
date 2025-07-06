import { BadGatewayException, Body, Controller, Get, Inject, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/LoginRequest.dto';
import { Response } from 'express';
import { LoginResponse, LoginResponseDto } from './dto/response/LoginResponse.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { AuthService } from './auth.service';
import { RegisterRequestDto } from './dto/request/RegisterRequest.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() body: LoginRequestDto, @Res() res: Response<LoginResponseDto>): Promise<void> {
    try {
      const user: LoginResponse = await this.authService.login(body);

      res.status(200).json(new BaseResponse(user, true, ResponseMessages.SUCCESS));
    } catch (error) {
      res.status(400).json(new BaseResponse(null, false, error.message));
    }
  }

  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    try {
      if (body.userType === UserTypes.STUDENT) {
        throw new BadGatewayException(ResponseMessages.USER_TYPE_NOT_VALID_FOR_REGISTER);
      }
      const result = await this.authService.register(body);

      return result;
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async getAll() {
    return await this.authService.getAll();
  }
  @Post('logout')
  logout() {}

  @Post('refresh-token')
  refresh() {}
}
