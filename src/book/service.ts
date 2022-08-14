import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from 'src/prisma/service';
import { BookDTO } from './dtos';
import {
  BookBadRequestException,
  BookForbiddenException,
  BookNotFoundException,
} from './exception';

@Injectable()
export class BooksService {
  private readonly logger: Logger = new Logger(BooksService.name);
  constructor(private readonly prisma: PrismaService) {}
  async createBook(
    ownerId: string,
    dto: BookDTO,
    authorId: string,
    categories: { id: string }[],
  ) {
    try {
      const data = { ...dto, ownerId };
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
      throw new BookBadRequestException('create');
    }
  }

  async updateBook(
    id: string,
    dto: BookDTO,
    authorId?: string,
    categories?: { id: string }[],
  ) {
    try {
      const data = {
        ...dto,
        author: authorId ? { connect: { id: authorId } } : { disconnect: true },
        categories: {
          set: categories || [],
        },
      };
      return await this.prisma.book.update({
        where: { id },
        data,
        include: {
          author: true,
          categories: true,
        },
      });
    } catch (error) {
      throw new BookBadRequestException('update');
    }
  }

  async toggleBookActivation(id: string, isActive: boolean) {
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

  async findBook(id: string) {
    return await this.prisma.book.findFirst({
      where: { id, isActive: true },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  async findAndCheckBookExistance(bookId: string) {
    const book = await this.findBook(bookId);
    if (!book) throw new BookNotFoundException(bookId);
    return book;
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

  async verifyBookOwnerAction(ownerId: string, book: Book, action: string) {
    if (ownerId !== book.ownerId)
      throw new BookForbiddenException(ownerId, book.id, action);
    return true;
  }

  async setBookAvailability(
    userId: string,
    bookId: string,
    isAvailableForExchanging: boolean,
  ) {
    const book = await this.findAndCheckBookExistance(bookId);
    await this.verifyBookOwnerAction(userId, book, 'UPDATE');

    const updatedBook = await this.prisma.book.update({
      where: {
        id: book.id,
      },
      data: {
        isAvailableForExchanging,
      },
    });

    if (!updatedBook) throw new BookBadRequestException('UPDATE');

    return updatedBook;
  }
}
