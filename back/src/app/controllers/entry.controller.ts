import { Body, Controller, Get, Param, Post, Request, ValidationPipe } from '@nestjs/common';

import { EntryDTO } from './../dto/entry.dto';
import { ResponseDTO } from './../dto/response.dto';
import { EntryService } from './../services/entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly service: EntryService) {}

  @Get('/helf-check')
  async helfCheck(@Request() req): Promise<string> {
    console.log(req.user);

    return 'The api is on';
  }

  @Get()
  async findAll():Promise<ResponseDTO> {
    return this.service.findAll();
  }
  
  @Get('/one/:id')
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.service.find(params);
  }

  @Post()
  async create(@Body(ValidationPipe) entry: EntryDTO): Promise<ResponseDTO> {
    return this.service.create(entry);
  }
}
