import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {
  DtoField,
  getValidationMessage,
  ValidationMessage,
} from 'src/_common/enums/ValidationMessages.enum';

export class CreateStudentRequestDto {
  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.NAME,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  name: string;

  @MaxLength(20, {
    message: getValidationMessage(
      DtoField.LASTNAME,
      ValidationMessage.MAX_LENGTH,
      { value: 20 },
    ),
  })
  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.LASTNAME,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  lastname: string; //Kontroller aşağıdan yukarı gidiyor

  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.IDENTITY_NUMBER,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  @IsInt({
    message: getValidationMessage(
      DtoField.IDENTITY_NUMBER,
      ValidationMessage.MUST_BE_NUMBER,
    ),
  })
  identityNumber: number;

  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.EMAIL,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  @IsEmail(
    {},
    {
      message: getValidationMessage(DtoField.EMAIL, ValidationMessage.IS_EMAIL),
    },
  )
  email: string;

  @IsNotEmpty({
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.IS_NOT_EMPTY,
    ),
  })
  @MaxLength(8, {
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.MAX_LENGTH,
      { value: 8 },
    ),
  })
  @MinLength(6, {
    message: getValidationMessage(
      DtoField.PASSWORD,
      ValidationMessage.MIN_LENGTH,
      { value: 6 },
    ),
  })
  password: string;
}
