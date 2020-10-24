import { IsNotEmpty } from "class-validator";

export class CategoryDTO {
  id: number;

  @IsNotEmpty({
    message: "Name must not be null",
  })
  description: string;

  @IsNotEmpty({
    message: "Type must not be null",
  })
  type: string;
}
