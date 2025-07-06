// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
//   Inject,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { QueryFailedError } from 'typeorm';
// import { ValidationError } from 'class-validator';
// import { LoggerService } from '../logger/logger.service';
// import { ResponseMessages } from '../enums/ResponseMessages.enum';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(
//     @Inject(LoggerService)
//     private readonly logger: LoggerService,
//   ) {}

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message: string | string[] = ResponseMessages.INTERNAL_SERVER_ERROR;
//     let errorName: string = 'InternalServerError';

//     // HTTP Hataları
//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       const res = exception.getResponse();

//       let rawMessage: any;

//       if (typeof res === 'string') {
//         rawMessage = res;
//       } else if (Array.isArray((res as any)?.message)) {
//         rawMessage = (res as any).message[0];
//       } else if (typeof (res as any)?.message === 'string') {
//         rawMessage = (res as any).message;
//       } else {
//         rawMessage = 'INTERNAL_SERVER_ERROR';
//       }

//       message =
//         typeof rawMessage === 'string' &&
//         ResponseMessages[
//           rawMessage.toUpperCase() as keyof typeof ResponseMessages
//         ]
//           ? ResponseMessages[
//               rawMessage.toUpperCase() as keyof typeof ResponseMessages
//             ]
//           : rawMessage;

//       errorName = exception.name;
//     }

//     // TypeORM Hataları
//     else if (exception instanceof QueryFailedError) {
//       status = HttpStatus.BAD_REQUEST;
//       message = (exception as any).message;
//       errorName = 'DatabaseError';
//     }

//     // class-validator hataları
//     else if (
//       Array.isArray(exception) &&
//       exception[0] instanceof ValidationError
//     ) {
//       status = HttpStatus.BAD_REQUEST;
//       message = exception
//         .map((e: ValidationError) => Object.values(e.constraints || {}))
//         .flat();
//       errorName = 'ValidationError';
//     }

//     // Response şekli
//     const responseBody = {
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       method: request.method,
//       error: errorName,
//       message,
//       ...(process.env.NODE_ENV !== 'production' && {
//         stack: (exception as any)?.stack,
//       }),
//     };

//     // Logla
//     this.logger.error(
//       {
//         path: request.url,
//         method: request.method,
//         statusCode: status,
//         message,
//         errorName,
//       },
//       (exception as any)?.stack,
//       'AllExceptionsFilter',
//     );

//     // Yanıtla
//     response.status(status).json(responseBody);
//   }
// }
// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
//   HttpStatus,
//   Inject,
// } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { QueryFailedError } from 'typeorm';
// import { ValidationError } from 'class-validator';
// import { LoggerService } from '../logger/logger.service';
// import { ResponseMessages } from '../enums/ResponseMessages.enum';
// import { BaseResponse } from 'src/_base/response/base.response';

// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   constructor(
//     @Inject(LoggerService)
//     private readonly logger: LoggerService,
//   ) {}

//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
//     let message: string | string[] = ResponseMessages.INTERNAL_SERVER_ERROR;
//     let errorName: string = 'InternalServerError';

//     if (exception instanceof HttpException) {
//       status = exception.getStatus();
//       const res = exception.getResponse();

//       let rawMessage: any;

//       if (typeof res === 'string') {
//         rawMessage = res;
//       } else if (Array.isArray((res as any)?.message)) {
//         rawMessage = (res as any).message;
//       } else if (typeof (res as any)?.message === 'string') {
//         rawMessage = (res as any).message;
//       } else {
//         rawMessage = 'INTERNAL_SERVER_ERROR';
//       }

//       message =
//         typeof rawMessage === 'string' &&
//         ResponseMessages[
//           rawMessage.toUpperCase() as keyof typeof ResponseMessages
//         ]
//           ? ResponseMessages[
//               rawMessage.toUpperCase() as keyof typeof ResponseMessages
//             ]
//           : rawMessage;

//       errorName = exception.name;
//     } else if (exception instanceof QueryFailedError) {
//       status = HttpStatus.BAD_REQUEST;
//       message = (exception as any).message;
//       errorName = 'DatabaseError';
//     } else if (
//       Array.isArray(exception) &&
//       exception[0] instanceof ValidationError
//     ) {
//       status = HttpStatus.BAD_REQUEST;

//       // Tüm hataları almak yerine sadece ilkini alıyoruz
//       const firstError = exception.find(
//         (e) => e.constraints && Object.keys(e.constraints).length > 0,
//       );
//       if (firstError) {
//         const constraintMessages = Object.values(firstError.constraints || {});
//         message = constraintMessages[0] as string; // 👈 sadece ilk hata mesajı
//       }

//       errorName = 'ValidationError';
//     }

//     // Logla
//     this.logger.error(
//       {
//         path: request.url,
//         method: request.method,
//         statusCode: status,
//         message,
//         errorName,
//       },
//       (exception as any)?.stack,
//       'AllExceptionsFilter',
//     );

//     // BaseResponse ile JSON döndür
//     const baseErrorResponse = {
//       ...new BaseResponse<null>(null, false, message as any), // string veya string[] olabilir
//       ...(process.env.NODE_ENV !== 'production' && {
//         stack: (exception as any)?.stack,
//       }),
//       statusCode: status,
//       path: request.url,
//       method: request.method,
//       error: errorName,
//       timestamp: new Date().toISOString(),
//     };

//     response.status(status).json(baseErrorResponse);
//   }
// }
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { ValidationError } from 'class-validator';
import { LoggerService } from '../logger/logger.service';
import { BaseErrorResponse } from 'src/_base/response/baseError.response';
import { ResponseMessages } from '../enums/ResponseMessages.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(LoggerService)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = ResponseMessages.INTERNAL_SERVER_ERROR;

    // Error name (log için)
    let errorName: string = 'InternalServerError';
    let stack: string | undefined = undefined;

    // 1. HttpException (NestJS -> throw new HttpException(...))
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      const rawMessage =
        typeof res === 'string'
          ? res
          : Array.isArray((res as any)?.message)
            ? (res as any)?.message[0]
            : (res as any)?.message;

      message =
        typeof rawMessage === 'string' &&
        ResponseMessages[
          rawMessage.toUpperCase() as keyof typeof ResponseMessages
        ]
          ? ResponseMessages[
              rawMessage.toUpperCase() as keyof typeof ResponseMessages
            ]
          : rawMessage;

      errorName = exception.name;
      stack = (exception as any)?.stack;
    }

    // 2. TypeORM hatası (örneğin duplicate key, constraint ihlali)
    else if (exception instanceof QueryFailedError) {
      status = HttpStatus.BAD_REQUEST;
      message = (exception as any).message;
      errorName = 'QueryFailedError';
      stack = (exception as any)?.stack;
    }

    // 3. class-validator doğrulama hataları (DTO hataları)
    else if (
      Array.isArray(exception) &&
      exception[0] instanceof ValidationError
    ) {
      status = HttpStatus.BAD_REQUEST;
      const firstError = exception[0];
      const constraintMessages = Object.values(firstError.constraints || {});
      message = constraintMessages[0] as string;
      errorName = 'ValidationError';
    }

    // 4. Diğer bilinmeyen hatalar
    else {
      stack = (exception as any)?.stack;
      message = (exception as any)?.message || message;
    }

    // ✅ BaseErrorResponse ile standart JSON dön
    const errorResponse = new BaseErrorResponse({
      message,
      statusCode: status,
      path: request.url,
      method: request.method,
    });

    // Loglama
    this.logger.error(
      {
        path: request.url,
        method: request.method,
        statusCode: status,
        message,
        errorName,
      },
      stack,
      'AllExceptionsFilter',
    );

    // Yanıtla
    response.status(status).json(errorResponse);
  }
}
