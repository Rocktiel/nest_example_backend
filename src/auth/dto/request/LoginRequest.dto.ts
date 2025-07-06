import {
  IsNotEmpty,
  IsStrongPassword,
  MAX_LENGTH,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

import {
  getValidationMessage,
  DtoField,
  ValidationMessage,
} from 'src/_common/enums/ValidationMessages.enum';

export class LoginRequestDto {
  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.EMAIL_OR_PHONE,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  @MinLength(11, {
    message: getValidationMessage(
      DtoField.EMAIL_OR_PHONE,
      ValidationMessage.MIN_LENGTH,
      { value: 11 },
    ),
  })
  @MaxLength(50, {
    message: getValidationMessage(
      DtoField.EMAIL_OR_PHONE,
      ValidationMessage.MAX_LENGTH,
      { value: 50 },
    ),
  })
  emailOrPhone: string;

  @IsStrongPassword(
    { minSymbols: 0, minUppercase: 0, minNumbers: 0 },
    {
      message: getValidationMessage(
        DtoField.PASSWORD,
        ValidationMessage.IS_STRONG_PASSWORD,
      ),
    },
  )
  @MinLength(11, {
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.MIN_LENGTH,
      { value: 11 },
    ),
  })
  @MaxLength(50, {
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.MAX_LENGTH,
      { value: 50 },
    ),
  })
  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  password: string;
}
