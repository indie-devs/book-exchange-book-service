import { BookStatus } from '@prisma/client';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { authorDTO } from 'src/author/dtos';

export class bookDTO {
  id?: number;
  status?: BookStatus;
  createdAt?: Date;
  updatedAt?: Date;

  @IsNotEmpty()
  title: string;

  @IsBoolean()
  isAvailableForExchanging?: boolean;
  @IsBoolean()
  isDisabled?: boolean;

  description: string;
  numberOfPages: number;
  coverImage: string;
  reprintTimes: number;
  publishDate: Date | string;
  publisher: string;
  language: string;
  authors?: authorDTO[];
}
