import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { BookBorrowDTO } from 'src/bookExchangeSession/dto';
import { BookExchangeSessionsService } from 'src/bookExchangeSession/service';
// import { PrismaService } from 'src/prisma/service';
import { v4 as uuid } from 'uuid';

describe('Book Exchange Session Int', () => {
  // let prisma: PrismaService;
  let bookExchangeService: BookExchangeSessionsService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // prisma = moduleRef.get(PrismaService);
    bookExchangeService = moduleRef.get(BookExchangeSessionsService);
    // await prisma.cleanDatabase();
  });
  describe('Request to Borrow Book', () => {
    const requesterId: string = uuid();
    const bookBorrowDTO: BookBorrowDTO = {
      bookId: 'test',
      dueDate: 'test',
      exchangeDate: 'test',
      note: 'test',
    };
    it('should throw book not found exception', async () => {
      await bookExchangeService
        .requestToBorrowBook(requesterId, bookBorrowDTO)
        .then((book) => expect(book).toBeUndefined)
        .catch((error) => {
          expect(error.status).toBe(404);
        });
    });
  });
});
