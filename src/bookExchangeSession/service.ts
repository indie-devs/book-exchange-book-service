import { Logger } from "@nestjs/common";
import { BookExchangeSession, BookExchangeSessionStatus, Prisma } from "@prisma/client";
import { BookUnknownException } from "src/book/exception";
import { BooksService } from "src/book/service";
import { PrismaService } from "src/prisma/service";
import { BookBorrowDTO } from "./dto";
import { BookExchangeSessionBadRequestException, BookExchangeSessionNotFoundException } from "./exception";

export class BookExchangeSessionsService {
    private readonly logger: Logger = new Logger(BookExchangeSessionsService.name);

    constructor(private readonly prisma: PrismaService, private readonly booksService: BooksService) { }

    async requestToBorrowBook(requesterId: string, bookBorrowDto: BookBorrowDTO): Promise<BookExchangeSession> {
        return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient): Promise<BookExchangeSession> => {
            const { bookId, exchangeDate, dueDate, note } = bookBorrowDto;
            await this.booksService.findAndCheckBookExistance(bookId);

            const newBookExchangeSession = await prisma.bookExchangeSession.create({
                data: {
                    bookId,
                    exchangeDate,
                    dueDate,
                    requesterId,
                    note
                }
            });

            if (!newBookExchangeSession) throw new BookExchangeSessionBadRequestException("CREATE");

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

    async findBookExchangeSession(id: string) {
        return await this.prisma.bookExchangeSession.findUnique({
            where: {
                id
            },
            include: {
                book: true,
            }
        });
    }

    async findAndVerifyBookExchangeSession(id: string) {
        const bookExchangeSession = await this.findBookExchangeSession(id);

        if (!bookExchangeSession) throw new BookExchangeSessionNotFoundException(id);

        return bookExchangeSession;
    }

    async updateAndVerifyBookExchangeSession(id: string, data: any, primsaTransactionClient?: Prisma.TransactionClient) {
        const prisma = primsaTransactionClient || this.prisma;
        const updatedBookExchangeSession = await prisma.bookExchangeSession.update({
            where: {
                id,
            },
            data
        });

        if (!updatedBookExchangeSession) throw new BookExchangeSessionBadRequestException("UPDATE");
        return updatedBookExchangeSession;
    }

    async changeBookExchangeSessionStatus(ownerId: string, bookExchangeSessionId: string, status: BookExchangeSessionStatus): Promise<BookExchangeSession> {
        return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient): Promise<BookExchangeSession> => {
            const bookExchangeSession = await this.findAndVerifyBookExchangeSession(bookExchangeSessionId);

            await this.booksService.verifyBookOwnerAction(ownerId, bookExchangeSession.book, "CHANGE");

            const updatedBookExchangeSession = await this.updateAndVerifyBookExchangeSession(bookExchangeSessionId, { status }, prisma);

            const isBookAvailableForExchanging = status !== BookExchangeSessionStatus.ACCEPTED;
            await this.booksService.setBookAvailability(ownerId, updatedBookExchangeSession.bookId, isBookAvailableForExchanging);

            return updatedBookExchangeSession;
        });
    }
}