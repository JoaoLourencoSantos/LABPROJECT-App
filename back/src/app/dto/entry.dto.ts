import { IsNotEmpty } from 'class-validator';

export class EntryDTO {
  id: number;

  @IsNotEmpty({
    message: 'Name must not be null',
  })
  name: string;

  @IsNotEmpty({
    message: 'Type must not be null',
  })
  type: string;

  @IsNotEmpty({
    message: 'Value must not be null',
  })
  value: string;

  @IsNotEmpty({
    message: 'Reference date must not be null',
  })
  referenceAt: Date;

  category: number;
}
