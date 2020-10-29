import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Category from '../models/category';
import { CategoryDTO } from './../dto/category.dto';
import { ResponseDTO } from './../dto/response.dto';

@Injectable()
export class CategoryService {
  public constructor(
    @InjectRepository(Category)
    public readonly categoryRepository: Repository<Category>
  ) {}

  async findAll({ type }): Promise<ResponseDTO> {
    try {
      if (!type) {
        return new ResponseDTO(
          "Found categorys",
          await this.categoryRepository.find(),
          200,
          true
        );
      }

      return new ResponseDTO("Found entrys", await this.categoryRepository.find({ type }), 200, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in find users: " + exception.message
      );
    }
  }

  async find({ id }): Promise<ResponseDTO> {
    if (!id) {
      throw new BadRequestException("Parameter 'id' is necessary!");
    }
    let result: Category = null;

    try {
      result = await this.categoryRepository.findOne(id);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in find entrys: " + exception.message
      );
    }

    if (!result) {
      throw new NotFoundException("user not found");
    }

    return new ResponseDTO("Found users", result, 200, true);
  }

  async create(entryDTO: CategoryDTO): Promise<ResponseDTO> {
    try {
      const newCategory = new Category();
      newCategory.description = entryDTO.description;
      newCategory.type = entryDTO.type;

      const category: Category = await this.categoryRepository.save(
        newCategory
      );

      console.log(category);

      return new ResponseDTO("Created", category, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in create user: " + exception.message
      );
    }
  }

  async update(categoryDTO: CategoryDTO): Promise<ResponseDTO> {
    try {
      const newCategory = new Category();
      newCategory.id = categoryDTO.id;
      newCategory.description = categoryDTO.description;
      newCategory.type = categoryDTO.type;

      const category: Category = await this.categoryRepository.save(newCategory);

      return new ResponseDTO("Created", category, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in create user: " + exception.message
      );
    }
  }

  async delete({ id }): Promise<ResponseDTO> {
    if (!id) {
      throw new BadRequestException("Parameter 'id' is necessary!");
    }

    try {
      return new ResponseDTO(
        "Entry deleted",
        await this.categoryRepository.delete(id),
        200,
        true
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in delete entrys: " + exception.message
      );
    }
  }
}
