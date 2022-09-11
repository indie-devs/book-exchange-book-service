import { BookStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class BookDTO {
  status?: BookStatus;

  @IsNotEmpty()
  title: string;

  isAvailableForExchanging?: boolean;
  isActive?: boolean;

  description: string;

  @IsNumber()
  numberOfPages: number;
  @IsNumber()
  reprintTimes: number;

  coverImage: string;
  publishDate: Date | string;
  publisher: string;
  language: string;
}

export class BookCreateDTO {
  @IsNotEmpty()
  ownerId?: string;

  @ValidateNested()
  @Type(() => BookDTO)
  book?: BookDTO;
  authorId?: string;
  categoriesId?: { id: string }[];
}

export class BookUpdateDTO {
  @IsNotEmpty()
  id?: string;

  @ValidateNested()
  @Type(() => BookDTO)
  book?: BookDTO;
  authorId?: string;
  categoriesId?: { id: string }[];
}
