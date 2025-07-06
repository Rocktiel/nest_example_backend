import { Module } from '@nestjs/common';
import { LoggerService } from './_common/logger/logger.service';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './_common/filters/all-exceptions.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './_common/config';
import { ParentModule } from './parent/parent.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  imports: [
    StudentsModule,
    AuthModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    ParentModule,
  ],
})
export class AppModule {}
