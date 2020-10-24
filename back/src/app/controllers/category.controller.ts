import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, ValidationPipe } from '@nestjs/common';

import { CategoryDTO } from './../dto/category.dto';
import { ResponseDTO } from './../dto/response.dto';
import { CategoryService } from './../services/category.service';

@Controller('category')
export class CategoryController {
    constructor(private readonly service: CategoryService) {}

  @Get("/helf-check")
  async helfCheck(@Request() req): Promise<string> {
    console.log(req.user);

    return "The api is on";
  }

  @Get()
  async findAll(@Query() query): Promise<ResponseDTO> {
    return this.service.findAll( query);
  }

  @Get("/one/:id")
  async findOne(@Param() params): Promise<ResponseDTO> {
    return this.service.find(params);
  } 

  @Post()
  async create(@Body(ValidationPipe) category: CategoryDTO): Promise<ResponseDTO> {
    return this.service.create(category);
  }

  @Put()
  async update(@Body(ValidationPipe) category: CategoryDTO): Promise<ResponseDTO> {
    return this.service.update(category);
  }

  @Delete("/:id")
  async delete(@Param() params): Promise<ResponseDTO> {
    return this.service.delete(params);
  }
}
