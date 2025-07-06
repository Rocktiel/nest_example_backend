// Alan isimlerini merkezi tanım
export enum DtoField {
  NAME = 'Ad',
  LASTNAME = 'Soyad',
  IDENTITY_NUMBER = 'T.C. Kimlik Numarası',
  EMAIL = 'E-posta',
  PASSWORD = 'Şifre',
  AGE = 'Yaş',
  PHONE = 'Telefon',
  EMAIL_OR_PHONE = 'EMAIL_OR_PHONE',
  USER_TYPE = 'USER_TYPE',
}

// Doğrulama türleri (mesajlar sabit)
export enum ValidationMessage {
  IS_NOT_EMPTY = 'boş bırakılamaz.',
  MUST_BE_STRING = 'metin formatında olmalıdır.',
  MUST_BE_NUMBER = 'sayı formatında olmalıdır.',
  MIN_LENGTH = 'en az {value} karakter olmalıdır.',
  MAX_LENGTH = 'en fazla {value} karakter olmalıdır.',
  IS_EMAIL = 'geçerli bir e-posta adresi olmalıdır.',
  IS_DATE = 'geçerli bir tarih formatı olmalıdır.',
  IS_STRONG_PASSWORD = 'IS_STRONG_PASSWORD',
  NOT_VALID = 'NOT_VALID',
}

export function getValidationMessage(
  field: DtoField,
  type: ValidationMessage,
  dynamicValue?: number | Record<string, any>,
): string {
  let message = `${field} ${type}`;

  // dynamicValue bir sayıysa, onu {value: x} olarak kabul et
  if (typeof dynamicValue === 'number') {
    message = message.replace('{value}', dynamicValue.toString());
  }

  // object ise her key-value'yu replace et
  if (typeof dynamicValue === 'object' && dynamicValue !== null) {
    Object.keys(dynamicValue).forEach((key) => {
      message = message.replace(`{${key}}`, dynamicValue[key]);
    });
  }

  return message;
}
