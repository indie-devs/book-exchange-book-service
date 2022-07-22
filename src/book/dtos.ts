import { BookStatus } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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

export class BookLendDTO {
  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  @IsDateString()
  exchangeDate: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsString()
  note: string;
}