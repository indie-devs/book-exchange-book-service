import { BookStatus } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

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
