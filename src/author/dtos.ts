import { IsNotEmpty } from 'class-validator';
import { bookDTO } from 'src/book/dtos';

export class authorDTO {
  id?: number;

  updatedAt?: Date;
  createdAt?: Date;

  @IsNotEmpty()
  name: string;

  dob?: Date;
  bio?: string;
  authorAvatar?: string;
  books?: bookDTO[];
}
