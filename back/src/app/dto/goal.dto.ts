import { IsNotEmpty } from 'class-validator';

export class GoalDTO {
  id: number;

  @IsNotEmpty({
    message: "Name must not be null",
  })
  description: string;


  @IsNotEmpty({
    message: "Value must not be null",
  })
  value: string;

  @IsNotEmpty({
    message: "Finish date must not be null",
  })
  finishDate: Date;
} 
