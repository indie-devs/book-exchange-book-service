import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { AuthorDTO } from './dtos';

@Injectable()
export class AuthorService {
  constructor(private readonly prisma: PrismaService) {}
  async createAuthor(dto: AuthorDTO) {
    try {
      return await this.prisma.author.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
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

  async findAll() {
    return await this.prisma.author.findMany();
  }
}
