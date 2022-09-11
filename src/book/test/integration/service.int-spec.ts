import { Test } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { authors, books, categories } from 'prisma/mock/data';
import { AppModule } from 'src/app.module';
import { BookController } from 'src/book/controller';
import { BookDTO } from 'src/book/dtos';
import {
  bookCreateDTO,
  bookEmptyTitle,
  bookEmptyDate,
  bookUpdateDTO,
  bookWithoutTitle,
  bookWrongFormatNumber,
} from '../mock/data';

describe('BookServices Int', () => {
  let bookController: BookController;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    bookController = moduleRef.get(BookController);
  });
  describe('create book', () => {
    it('should return error when create book incorrect publish date field', async () => {
      await bookController
        .createBook({
          ownerId: 'test',
          book: bookEmptyDate,
          authorId: 'test',
        })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when create book connect to incorrect authorId', async () => {
      await bookController
        .createBook({
          ownerId: 'test',
          book: bookCreateDTO,
          authorId: 'test',
        })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when create book connect to incorrect categoriesId', async () => {
      await bookController
        .createBook({
          ownerId: 'test',
          book: bookCreateDTO,
          categoriesId: [{ id: 'test' }],
        })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when create book without owner id', async () => {
      await bookController
        .createBook({ book: bookCreateDTO })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });

    it('should create a book without author', async () => {
      const book = await bookController.createBook({
        ownerId: 'test',
        book: bookCreateDTO,
        categoriesId: [{ id: categories[0].id }],
      });
      expect(book.title).toEqual(bookCreateDTO.title);
      expect(book.author).toBeNull();
      expect(book.categories.map((cate) => cate.id)).toEqual([
        categories[0].id,
      ]);
    });
    it('should create a book without categories', async () => {
      const book = await bookController.createBook({
        ownerId: 'test',
        book: bookCreateDTO,
        authorId: authors[0].id,
      });
      expect(book.title).toEqual(bookCreateDTO.title);
      expect(book.author.id).toEqual(authors[0].id);
      expect(book.categories).toStrictEqual([]);
    });
    it('should create a book with author and category', async () => {
      const book = await bookController.createBook({
        ownerId: 'test',
        book: bookCreateDTO,
        authorId: authors[1].id,
        categoriesId: [{ id: categories[0].id }],
      });
      expect(book.title).toEqual(bookCreateDTO.title);
      expect(book.author.id).toEqual(authors[1].id);
      expect(book.categories.map((cate) => cate.id)).toEqual([
        categories[0].id,
      ]);
    });
  });

  describe('update book', () => {
    it('should return error when update book incorrect publish date field', async () => {
      await bookController
        .updateBook({
          id: 'testA',
          book: bookEmptyDate,
        })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when update without book id', async () => {
      await bookController
        .updateBook({
          id: books[0].id,
          book: bookEmptyDate,
        })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when update incorrect book id', async () => {
      await bookController
        .updateBook({ id: 'test A', book: bookUpdateDTO })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when update book connect to incorrect authorId', async () => {
      await bookController
        .updateBook({ id: books[0].id, authorId: 'test' })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });
    it('should return error when update book connect to incorrect categoriesId', async () => {
      await bookController
        .updateBook({ id: books[0].id, categoriesId: [{ id: 'test' }] })
        .then((book) => expect(book).toBeUndefined())
        .catch((error) => {
          expect(error.status).toBe(400);
        });
    });

    it('should return a book with author, empty categories when connect to author only', async () => {
      const book = await bookController.updateBook({
        id: books[0].id,
        book: bookUpdateDTO,
        authorId: authors[0].id,
      });
      expect(book.title).toEqual(bookUpdateDTO.title);
      expect(book.author.id).toEqual(authors[0].id);
      expect(book.author.name).toEqual(authors[0].name);
      expect(book.categories).toStrictEqual([]);
    });
    it('should return a book with category, null author when connect to category only', async () => {
      const book = await bookController.updateBook({
        id: books[0].id,
        book: bookUpdateDTO,
        categoriesId: [{ id: categories[0].id }],
      });
      expect(book.title).toEqual(bookUpdateDTO.title);
      expect(book.author).toBeNull();
      expect(book.categories.map((cate) => cate.id)).toEqual([
        categories[0].id,
      ]);
    });
    it('should create a book with author and category', async () => {
      const book = await bookController.updateBook({
        id: books[0].id,
        book: bookUpdateDTO,
        categoriesId: [{ id: categories[0].id }],
        authorId: authors[0].id,
      });
      expect(book.title).toEqual(bookUpdateDTO.title);
      expect(book.author.id).toEqual(authors[0].id);
      expect(book.categories.map((cate) => cate.id)).toEqual([
        categories[0].id,
      ]);
    });
  });

  describe('validator book', () => {
    it('should return error when create book empty value title', async () => {
      const dtoObject = plainToInstance(BookDTO, bookEmptyTitle);
      const error = await validate(dtoObject);
      expect(error.length).not.toBe(0);
      expect(error[0].constraints['isNotEmpty']).toEqual(
        'title should not be empty',
      );
    });
    it('should return error when missing title field', async () => {
      const dtoObject = plainToInstance(BookDTO, bookWithoutTitle);
      const error = await validate(dtoObject);
      expect(error.length).not.toBe(0);
      expect(error[0].constraints['isNotEmpty']).toEqual(
        'title should not be empty',
      );
    });

    it('should return error when incorrect format type number', async () => {
      const dtoObject = plainToInstance(BookDTO, bookWrongFormatNumber);
      const error = await validate(dtoObject);
      expect(error.length).not.toBe(0);
      expect(error[0].constraints['isNumber']).toContain(
        'numberOfPages must be a number ',
      );
    });
  });
});
