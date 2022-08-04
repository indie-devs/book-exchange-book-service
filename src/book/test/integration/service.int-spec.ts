import { Test } from '@nestjs/testing';
import { Author, BookStatus, Category } from '@prisma/client';
import { AppModule } from 'src/app.module';
import { BookDTO } from 'src/book/dtos';
import { BooksService } from 'src/book/service';
import { PrismaService } from 'src/prisma/service';

describe('BookServices Int', () => {
  let prisma: PrismaService;
  let bookServices: BooksService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = moduleRef.get(PrismaService);
    bookServices = moduleRef.get(BooksService);
    await prisma.cleanDatabase();
  });
  let bookId: string;
  const dto: BookDTO = {
    title: 'test book',
    coverImage: 'test cover image',
    description: 'some description',
    language: 'vi-VN',
    numberOfPages: 999,
    publishDate: new Date(),
    publisher: 'IV',
    reprintTimes: 7,
  };
  describe('create book', () => {
    let authorId: string;
    let categoryId: string;
    it('should create author', async () => {
      const author = await prisma.author.create({
        data: {
          name: 'William Shakespeare',
        },
      });
      authorId = author.id;
    });
    it('should create category', async () => {
      const category = await prisma.category.create({
        data: {
          name: 'fiction',
        },
      });
      categoryId = category.id;
    });
    it('should create book', async () => {
      const book = await bookServices.createBook('test Owner', dto, authorId, [
        { id: categoryId },
      ]);
      bookId = book.id;
      expect(book.title).toBe(dto.title);
      expect(book.status).toBe(BookStatus.NEW);
    });
  });

  describe('update book', () => {
    let author: Author;
    let category: Category;
    it('should create a new author', async () => {
      author = await prisma.author.create({
        data: {
          name: 'Robert Martin',
        },
      });
    });
    it('should create a new category', async () => {
      category = await prisma.category.create({
        data: {
          name: 'Technology',
        },
      });
    });
    it('should update book(title, status, author, category)', async () => {
      const status = BookStatus.PUBLISHED;
      const updateBook = {
        ...dto,
        title: 'Clean Architecture',
        status,
      };
      const book = await bookServices.updateBook(
        bookId,
        updateBook,
        author.id,
        [{ id: category.id }],
      );
      expect(book.title).toBe('Clean Architecture');
      expect(book.status).toBe(status);
      expect(book.author).toStrictEqual(author);
      expect(book.categories).toStrictEqual([category]);
    });
    it('should toggle book', async () => {
      const isActive = false;
      const book = await bookServices.toggleBookActivation(bookId, false);
      expect(book.isActive).toBe(isActive);
    });
  });
});
