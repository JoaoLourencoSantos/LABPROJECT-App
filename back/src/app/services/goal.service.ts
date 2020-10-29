import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Goal from '../models/goal';
import { GoalDTO } from './../dto/goal.dto';
import { ResponseDTO } from './../dto/response.dto';

@Injectable()
export class GoalService {
  public constructor(
    @InjectRepository(Goal)
    public readonly goalRepository: Repository<Goal>
  ) {}

  async findAll(): Promise<ResponseDTO> {
    try {
      
      return new ResponseDTO(
        "Found goals",
        await this.goalRepository.find(),
        200,
        true
      ); 
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
    let result: Goal = null;

    try {
      result = await this.goalRepository.findOne(id);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in find goals: " + exception.message
      );
    }

    if (!result) {
      throw new NotFoundException("goal not found");
    }

    return new ResponseDTO("Found users", result, 200, true);
  }

  async create(goalDTO: GoalDTO): Promise<ResponseDTO> {
    try {
      const newGoal = new Goal();
      newGoal.description = goalDTO.description;
      newGoal.value = Number(goalDTO.value);
      newGoal.description = goalDTO.description;
      newGoal.finishDate = goalDTO.finishDate; 

      const goal: Goal = await this.goalRepository.save(
        newGoal
      );

      console.log(goal);

      return new ResponseDTO("Created", goal, 201, true);
    } catch (exception) {
      throw new InternalServerErrorException(
        "Erro in create user: " + exception.message
      );
    }
  }

  async update(goalDTO: GoalDTO): Promise<ResponseDTO> {
    try { 
      const newGoal = new Goal();
      newGoal.id = goalDTO.id;
      newGoal.description = goalDTO.description;
      newGoal.value = Number(goalDTO.value);
      newGoal.description = goalDTO.description;
      newGoal.finishDate = goalDTO.finishDate; 

      const goal: Goal = await this.goalRepository.save(
        newGoal
      );


      return new ResponseDTO("Created", goal, 201, true);
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
        await this.goalRepository.delete(id),
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
