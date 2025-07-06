import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStudentRequestDto } from './dto/request/CreateStudent.request.dto';
import { BaseResponse } from 'src/_base/response/base.response';
import { ResponseMessages } from 'src/_common/enums/ResponseMessages.enum';

@Controller('students')
export class StudentsController {
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createStudentDto: CreateStudentRequestDto) {
    return new BaseResponse(createStudentDto, true, ResponseMessages.SUCCESS);
  }
}
