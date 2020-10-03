import { Body, Controller, Get, Param, Post, Request, ValidationPipe } from '@nestjs/common';

import { EntryDTO } from './../dto/entry.dto';
import { ResponseDTO } from './../dto/response.dto';
import { EntryService } from './../services/entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly repository: EntryService) {}

  @Get('/helf-check')
  async helfCheck(@Request() req): Promise<string> {
    console.log(req.user);

    return 'The api is on';
  }

  @Get()
  async findAll(): Promise<ResponseDTO> {
    return this.repository.findAll();
  }

  @Get('/one/:id')
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.repository.find(params);
  }

  @Post()
  async create(@Body(ValidationPipe) entry: EntryDTO): Promise<ResponseDTO> {
    return this.repository.create(entry);
  }
}
