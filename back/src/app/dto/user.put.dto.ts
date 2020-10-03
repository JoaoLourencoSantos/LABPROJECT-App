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

  @IsNotEmpty({
    message: 'Email must not be null',
  })
  @IsEmail(
    {},
    {
      message: 'Email must be valid',
    },
  )
  @MaxLength(200, {
    message: 'Email not must be longer than 200 characters',
  })
  email: string;
  
  dateBirth: Date;
}
