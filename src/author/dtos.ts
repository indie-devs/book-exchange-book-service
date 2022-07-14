import { IsNotEmpty } from 'class-validator';

export class AuthorDTO {
  @IsNotEmpty()
  name: string;

  dob?: Date;
  bio?: string;
  authorAvatar?: string;
}
