import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { AuthorDTO } from './dtos';

@Injectable()
export class AuthorsService {
  private readonly logger: Logger = new Logger(AuthorsService.name);
  constructor(private readonly prisma: PrismaService) {}
  async createAuthor(dto: AuthorDTO) {
    try {
      return await this.prisma.author.create({ data: dto });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async findBooksByAuthor(authorId: string) {
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
