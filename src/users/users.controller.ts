import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Head, Header, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request, Response } from 'express';
import { ResponseUtils } from 'src/utils/response_utils';
import { ValidationPipe } from 'src/infrastructures/security/validation/validation.pipe';
import { isUUID } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @Header('Content-Type', 'application/json')
  register(@Body(new ValidationPipe()) createUserDto: CreateUserDto, @Res() response: Response) {

    this.usersService.register(createUserDto).then((value) => {
      response.statusCode = value.statusCode;
      response.send(value);
    }).catch((message) => {
      console.log(message);
      response.statusCode = 500;
      response.send(ResponseUtils.createError("Error register users"));
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/detail/:uuid')
  findOne(@Param('uuid') uuid: string, @Res() response: Response) {
    if (isUUID(uuid, 4)) {
      this.usersService.getUserbyId(uuid).then((value) => {
      response.statusCode = value.statusCode;
      response.send(value);
    }).catch((message) => {
      console.log(message);
      response.statusCode = 500;
      response.send(ResponseUtils.createError("Error register users"));
    });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
