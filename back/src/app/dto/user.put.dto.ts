import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserPutDTO {

  @IsNotEmpty({
    message: 'Id must not be null',
  })
  id: number;

  @IsNotEmpty({
    message: 'Name must not be null',
  })
  name: string;

  email: string;
  
  dateBirth: Date;
}
