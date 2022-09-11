import { Body, Controller, Injectable, Post, Put } from '@nestjs/common';
import { BookCreateDTO, BookUpdateDTO } from './dtos';
import { BooksService } from './service';

@Injectable()
@Controller('book')
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  @Post('')
  async createBook(
    @Body() { ownerId, book, authorId, categoriesId }: BookCreateDTO,
  ) {
    return await this.booksService.createBook(
      ownerId,
      book,
      authorId,
      categoriesId,
    );
  }

  @Put('')
  async updateBook(
    @Body() { id, book, authorId, categoriesId }: BookUpdateDTO,
  ) {
    return await this.booksService.updateBook(id, book, authorId, categoriesId);
  }
}
