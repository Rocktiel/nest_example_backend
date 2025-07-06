// prettier-ignore
import {
  IsEnum,
  IsNotEmpty,
  IsStrongPassword,
  MAX_LENGTH,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { UserTypes } from 'src/_common/enums/UserTypes.enum';

import { getValidationMessage, DtoField, ValidationMessage } from 'src/_common/enums/ValidationMessages.enum';

export class RegisterRequestDto {
  @IsNotEmpty({ message: getValidationMessage(DtoField.EMAIL, ValidationMessage.IS_NOT_EMPTY) })
  @MinLength(11, { message: getValidationMessage(DtoField.EMAIL, ValidationMessage.MIN_LENGTH, { value: 11 }) })
  @MaxLength(50, { message: getValidationMessage(DtoField.EMAIL, ValidationMessage.MAX_LENGTH, { value: 50 }) })
  email: string;

  @IsNotEmpty({ message: getValidationMessage(DtoField.PHONE, ValidationMessage.IS_NOT_EMPTY) })
  @MinLength(11, { message: getValidationMessage(DtoField.PHONE, ValidationMessage.MIN_LENGTH, { value: 11 }) })
  @MaxLength(50, { message: getValidationMessage(DtoField.PHONE, ValidationMessage.MAX_LENGTH, { value: 50 }) })
  phoneNumber: string;

  @IsNotEmpty({ message: getValidationMessage(DtoField.NAME, ValidationMessage.IS_NOT_EMPTY) })
  @MinLength(3, { message: getValidationMessage(DtoField.NAME, ValidationMessage.MIN_LENGTH, { value: 3 }) })
  @MaxLength(50, { message: getValidationMessage(DtoField.NAME, ValidationMessage.MAX_LENGTH, { value: 50 }) })
  firstName: string;

  @IsNotEmpty({ message: getValidationMessage(DtoField.LASTNAME, ValidationMessage.IS_NOT_EMPTY) })
  @MinLength(2, { message: getValidationMessage(DtoField.LASTNAME, ValidationMessage.MIN_LENGTH, { value: 2 }) })
  @MaxLength(50, { message: getValidationMessage(DtoField.LASTNAME, ValidationMessage.MAX_LENGTH, { value: 50 }) })
  lastName: string;

  @IsStrongPassword({ minSymbols: 0, minUppercase: 0, minNumbers: 0 }, { message: getValidationMessage(DtoField.PASSWORD, ValidationMessage.IS_STRONG_PASSWORD) })
  @MinLength(6, { message: getValidationMessage(DtoField.PASSWORD, ValidationMessage.MIN_LENGTH, { value: 6 }) })
  @MaxLength(50, { message: getValidationMessage(DtoField.PASSWORD, ValidationMessage.MAX_LENGTH, { value: 50 }) })
  @IsNotEmpty({ message: getValidationMessage(DtoField.PASSWORD, ValidationMessage.IS_NOT_EMPTY) })
  password: string;

  @IsEnum(UserTypes, { message: getValidationMessage(DtoField.USER_TYPE, ValidationMessage.NOT_VALID) })
  @IsNotEmpty({ message: getValidationMessage(DtoField.USER_TYPE, ValidationMessage.IS_NOT_EMPTY) })
  userType: UserTypes;
}
