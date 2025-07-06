import { forwardRef, Inject, Injectable, NotFoundException, Res } from '@nestjs/common';
import { LoginRequestDto } from './dto/request/LoginRequest.dto';
import { LoginResponse } from './dto/response/LoginResponse.dto';
import { ParentService } from 'src/parent/parent.service';
import { Parent } from 'src/_common/typeorm';
import * as bcrypt from 'bcrypt';

import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';
import { RegisterRequestDto } from './dto/request/RegisterRequest.dto';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';

@Injectable()
export class AuthService {
  async register(body: RegisterRequestDto) {
    const isAvailable = await this.isAvailableForRegister(body);
    if (isAvailable) {
      if (body.userType === UserTypes.PARENT) {
        const hashedPassword = await bcrypt.hashSync(body.password, 10);
        const parent = this.parentService.createParent({ ...body, password: hashedPassword });
        return parent;
      }
    }
  }
  async getAll() {
    return await this.parentService.getAll();
  }
  constructor(
    @Inject(forwardRef(() => ParentService))
    private readonly parentService: ParentService,
  ) {}
  async login(data: LoginRequestDto): Promise<LoginResponse> {
    const parent: Parent | null = await this.parentService.findParentForLogin(data.emailOrPhone, this.isEmail(data.emailOrPhone));
    if (parent && bcrypt.compareSync(data.password, parent.password)) {
      return {
        accessToken: '',
        refreshToken: '',
        user: { lastname: parent.lastName, name: parent.firstName, pay: 0 },
      };
    } else {
      throw new NotFoundException(ResponseMessages.PASSWORD_OR_EMAIL_INCORRECT);
    }
    return {
      accessToken: '',
      refreshToken: '',
      user: { lastname: '', name: '', pay: 0 },
    };
  }

  private isEmail(emailOrPhone: string) {
    return emailOrPhone.includes('@');
  }

  private async isAvailableForRegister(body: RegisterRequestDto) {
    if (body.userType === UserTypes.PARENT) {
      const isEmailAvailable = await this.parentService.isEmailAvailable(body.email);
      const isPhoneAvailable = await this.parentService.isPhoneAvailable(body.phoneNumber);
      if (isEmailAvailable) {
        throw new NotFoundException(ResponseMessages.EMAIL_ALREADY_EXISTS);
      }
      if (isPhoneAvailable) {
        throw new NotFoundException(ResponseMessages.PHONE_ALREADY_EXISTS);
      }
      return true;
    }
  }
}
