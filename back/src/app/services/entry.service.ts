import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDTO } from '../dto/response.dto';
import Entry from '../models/entry';
import { EntryDTO } from './../dto/entry.dto';

@Injectable()
export class EntryService {
  public constructor(
    @InjectRepository(Entry) public readonly entryRepository: Repository<Entry>,
  ) {}

  async findAll(): Promise<ResponseDTO> {
    try {
      return new ResponseDTO(
        'Found users',
        await this.entryRepository.find(),
        200,
        true,
      );
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in find users: ' + exception.message,
      );
    }
  }

  async find({ id }): Promise<ResponseDTO> {
    if (!id) {
      throw new BadRequestException("Parameter 'id' is necessary!");
    }
    let result: Entry = null;

    try {
      result = await this.entryRepository.findOne(id);
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in find entrys: ' + exception.message,
      );
    }

    if (!result) {
      throw new NotFoundException('user not found');
    }

    return new ResponseDTO('Found users', result, 200, true);
  }

  async create(entryDTO: EntryDTO): Promise<ResponseDTO> {
    try {
      const newEntry = new Entry();
      newEntry.name = entryDTO.name;
      newEntry.value = Number(entryDTO.value);
      newEntry.type = entryDTO.type;
      newEntry.referenceAt = entryDTO.referenceAt;

      const entry: Entry = await this.entryRepository.save(newEntry);

      return new ResponseDTO('Created', entry, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        'Erro in create user: ' + exception.message,
      );
    }
  }
}
