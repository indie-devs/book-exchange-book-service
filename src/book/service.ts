import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { BookDTO } from './dtos';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}
  async createBook(
    dto: BookDTO,
    authorId: number,
    categories: { id: number }[],
  ) {
    try {
      const data = { ...dto };
      if (authorId) {
        data['author'] = {
          connect: {
            id: authorId,
          },
        };
      }
      if (Array.isArray(categories) && categories?.length > 0) {
        data['categories'] = {
          connect: categories,
        };
      }
      return await this.prisma.book.create({
        data,
        include: {
          author: true,
          categories: true,
        },
      });
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async updateBook(
    id: number,
    dto: BookDTO,
    authorId?: number,
    categories?: { id: number }[],
  ) {
    try {
      const data = {
        ...dto,
        categories: {
          set: categories,
        },
      };
      if (authorId) {
        data['author'] = {
          connect: {
            id: authorId,
          },
        };
      }
      return await this.prisma.book.update({
        where: { id },
        data,
        include: {
          author: true,
          categories: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async findBook(id: number) {
    return await this.prisma.book.findFirst({
      where: { id, isActive: true },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  async findBooks() {
    return await this.prisma.book.findMany({
      where: { isActive: true },
      include: {
        author: true,
        categories: true,
      },
    });
  }
}
