import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty()
  name: string;

  description?: string;
  coverImage?: string;

  @IsBoolean()
  isActive?: boolean;
}
