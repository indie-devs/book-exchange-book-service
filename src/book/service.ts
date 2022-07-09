import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { bookDTO } from './dtos';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async createBook(bookDTO: bookDTO) {
    try {
      return await this.prisma.book.create({
        data: bookDTO,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async createBookByAuthor(bookDTO: bookDTO, authorId: number) {
    try {
      return await this.prisma.book.create({
        data: {
          ...bookDTO,
          authors: {
            connect: {
              id: authorId,
            },
          },
        },
        include: {
          authors: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateBook(id: number, dto: bookDTO) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateBookAuthors(id: number, authorId: { id: number }[]) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: {
          authors: {
            set: authorId,
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateBookCategories(id: number, categories: { id: number }[]) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: {
          categories: {
            set: categories,
          },
        },
        include: {
          categories: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async toggleBook(id: number, isActive: boolean) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: {
          isActive,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findBook(id: number) {
    return await this.prisma.book.findFirst({
      where: { id, isActive: true },
      include: {
        authors: true,
        categories: true,
      },
    });
  }

  async findBooks() {
    return await this.prisma.book.findMany({
      where: { isActive: true },
      include: {
        authors: true,
        categories: true,
      },
    });
  }

  async findCategoriesByBook(bookId: number) {
    return await this.prisma.book.findMany({
      where: {
        id: bookId,
      },
      include: {
        categories: true,
        authors: true,
      },
    });
  }
}
