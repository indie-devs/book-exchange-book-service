import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { authorDTO } from './dtos';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}
  async createAuthor(dto: authorDTO) {
    try {
      return await this.prisma.author.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findBooksByAuthor(authorId: number) {
    return await this.prisma.author.findFirst({
      where: {
        id: authorId,
      },
      include: {
        books: true,
      },
    });
  }
}
