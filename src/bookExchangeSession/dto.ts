import { IsNotEmpty, IsDateString, IsString } from 'class-validator';

export class BookBorrowDTO {
  @IsNotEmpty()
  bookId: string;

  @IsNotEmpty()
  @IsDateString()
  exchangeDate: string;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;

  @IsString()
  note: string;
}
