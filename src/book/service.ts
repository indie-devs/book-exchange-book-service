import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BookExchangeSession, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/service';
import { BookDTO, BookLendDTO } from './dtos';
import { BookExchangeBadRequestException, BookNotFoundException, BookUnknownException } from './exception';

@Injectable()
export class BooksService {
  private readonly logger: Logger = new Logger(BooksService.name);
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
      this.logger.error(error.message);
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
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async toggleBookActivation(id: number, isActive: boolean) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: {
          isActive,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
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

  async requestToBorrowBook(requesterId: string, bookLendDto: BookLendDTO): Promise<BookExchangeSession> {
    return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient): Promise<BookExchangeSession> => {
      const { bookId, exchangeDate, dueDate, note } = bookLendDto;
      const book = await this.findBook(bookId);
      if(!book) throw new BookNotFoundException(bookId)
  
      const newBookExchangeSession = await prisma.bookExchangeSession.create({
        data: {
          bookId,
          exchangeDate,
          dueDate,
          requesterId,
          note
        }
      });
  
      if (!newBookExchangeSession) throw new BookExchangeBadRequestException("CREATE");
  
      const updatedBook = await prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          isAvailableForExchanging: false,
        }
      });
  
      if (updatedBook.isAvailableForExchanging) throw new BookUnknownException("UPDATE", "isAvailableForExchanging is not updated successfully.")
  
      return newBookExchangeSession;
    });
  }
}
