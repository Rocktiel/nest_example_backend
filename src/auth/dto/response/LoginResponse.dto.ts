import { BaseResponse } from 'src/_base/response/base.response';
import { EmployeeResponse } from 'src/_common/response/Employee.response';

export class LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: EmployeeResponse;
}

export class LoginResponseDto extends BaseResponse<LoginResponse> {
  declare data: LoginResponse | null;
}
