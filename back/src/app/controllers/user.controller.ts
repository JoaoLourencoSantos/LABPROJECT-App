import { UserPutDTO } from './../dto/user.put.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';

import { ResponseDTO } from '../dto/response.dto';
import { UserDTO } from '../dto/user.dto';
import RepoService from '../services/user.service';
import { JwtAuthGuard } from './../../auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly service: RepoService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/helf-check')
  async helfCheck(@Request() req): Promise<string> {
    console.log(req.user);

    return 'The api is on';
  }

  @Get()
  async findAll(): Promise<ResponseDTO> {
    return this.service.findAll();
  }

  @Get('/one/:id')
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.service.find(params);
  }

  @Post()
  async create(@Body(ValidationPipe) user: UserDTO): Promise<ResponseDTO> {
    return this.service.create(user);
  }

  @Put()
  async update(@Body(ValidationPipe) user: UserPutDTO): Promise<ResponseDTO> {
    return this.service.update(user);
  }

  @Delete("/:id")
  async delete(@Param() params): Promise<ResponseDTO> {
    return this.service.delete(params);
  }
}
