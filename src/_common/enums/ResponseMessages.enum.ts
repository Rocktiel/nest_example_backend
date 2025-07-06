export enum ResponseMessages {
  SUCCESS = 'SUCCESS',
  BAD_GATEWAY = 'BAD_GATEWAY',

  FORBIDDEN = 'Erişim engellendi',
  UNAUTHORIZED = 'Kimlik doğrulama başarısız',
  BAD_REQUEST = 'Geçersiz istek',
  NOT_FOUND = 'Kaynak bulunamadı',
  INTERNAL_SERVER_ERROR = 'Sunucu hatası',

  // Doğrulama (validation) hataları
  VALIDATION_FAILED = 'Doğrulama hatası oluştu',

  // Veritabanı hataları
  DATABASE_ERROR = 'Veritabanı hatası meydana geldi',

  // Özel hata mesajları (kendi senaryoların için)
  USER_NOT_FOUND = 'Kullanıcı bulunamadı',
  EMAIL_ALREADY_EXISTS = 'E-posta adresi zaten kayıtlı',
  PASSWORD_OR_EMAIL_INCORRECT = 'Şifre veya e-posta adresi yanlış.',
  USER_TYPE_NOT_VALID_FOR_REGISTER = 'USER_TYPE_NOT_VALID_FOR_REGISTER',
  PHONE_ALREADY_EXISTS = 'Telefon numarası zaten kayıtlı',
}
