import { IsBoolean, IsNotEmpty } from 'class-validator';

export class categoryDTO {
  id?: number;

  @IsNotEmpty()
  name: string;

  description?: string;
  coverImage?: string;

  createAt?: Date;
  updateAt?: Date;

  @IsBoolean()
  isActive?: boolean;
}
