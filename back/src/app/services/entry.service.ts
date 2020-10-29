import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseDTO } from '../dto/response.dto';
import Category from '../models/category';
import Entry from '../models/entry';
import { EntryDTO } from './../dto/entry.dto';

@Injectable()
export class EntryService {
  public constructor(
    @InjectRepository(Entry) public readonly entryRepository: Repository<Entry>,
    @InjectRepository(Entry) public readonly categoryRepository: Repository<Category>
  ) {}

  async findAll({ type, month }): Promise<ResponseDTO> {
    try {
      const searchMonth: number = month ? month : new Date().getMonth() + 1;

      let list: any[] = [];

      if (type) {
        list = await this.entryRepository
          .createQueryBuilder("entry")
          .select()
          .addSelect(['category.description'])
          .where("entry.type = :type", { type })
          .leftJoinAndSelect("entry.category", "category")
          .andWhere("strftime('%m', entry.reference_at) = :month", {
            month: searchMonth.toString(),
          })
          .getMany();
      } else {
        list = await this.entryRepository
          .createQueryBuilder("entry")
          .leftJoinAndSelect("entry.category", "category")
          .andWhere("strftime('%m', entry.reference_at) = :month", {
            month: searchMonth.toString(),
          })
          .getMany();
      }

      return new ResponseDTO("Found entrys", list, 200, true);
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
    let result: Entry = null;

    try {
      result = await this.entryRepository.findOne(id);
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

  async findIndicators({ month }): Promise<ResponseDTO> {
    try {
      //PROFIT // EXPENSE

      const searchMonth: number = month ? month : new Date().getMonth() + 1;

      const values: any = await this.entryRepository
        .createQueryBuilder()
        .select([
          "(COALESCE(subQuery.totalProfits +  (subQuery.totalExpenses * -1), 0)) as totalPeriod",
          "COALESCE(subQuery.totalExpenses, 0) as totalExpenses",
          "COALESCE(subQuery.totalProfits, 0) as totalProfits",
        ])
        .from((query) => {
          return query
            .select([])
            .addSelect((qb) => {
              return qb
                .select("SUM(entry.value)", "totalExpenses")
                .from(Entry, "entry")
                .where("entry.type = 'EXPENSE'")
                .andWhere("strftime('%m', entry.reference_at) = :month", {
                  month: searchMonth.toString(),
                });
            }, "totalExpenses")
            .addSelect((qb) => {
              return qb
                .select("SUM(entry.value)", "totalProfits")
                .from(Entry, "entry")
                .where("entry.type = 'PROFIT'")
                .andWhere("strftime('%m', entry.reference_at) = :month", {
                  month: searchMonth.toString(),
                });
            }, "totalProfits")
            .from(Entry, "entry");
        }, "subQuery")
        .getRawOne();

      return new ResponseDTO("Found indicators", values, 200, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in find users: " + exception.message
      );
    }
  }

  async create(entryDTO: EntryDTO): Promise<ResponseDTO> {
    try {
      console.log("QUI")
      const newEntry = new Entry();
      newEntry.name = entryDTO.name;
      newEntry.value = Number(entryDTO.value);
      newEntry.type = entryDTO.type;
      newEntry.referenceAt = entryDTO.referenceAt;
      newEntry.category = await this.categoryRepository.findOne(entryDTO.category);

      const entry: Entry = await this.entryRepository.save(newEntry);

      return new ResponseDTO("Created", entry, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in create user: " + exception.message
      );
    }
  }

  async update(entryDTO: EntryDTO): Promise<ResponseDTO> {
    try {
      const newEntry = new Entry();
      newEntry.id = entryDTO.id;
      newEntry.name = entryDTO.name;
      newEntry.value = Number(entryDTO.value);
      newEntry.type = entryDTO.type;
      newEntry.referenceAt = entryDTO.referenceAt;
      newEntry.category = await this.categoryRepository.findOne(entryDTO.category);

      const entry: Entry = await this.entryRepository.save(newEntry);

      return new ResponseDTO("Created", entry, 201, true);
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
        await this.entryRepository.delete(id),
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
