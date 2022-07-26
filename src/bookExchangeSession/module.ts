import { Module } from '@nestjs/common';
import { BooksService } from 'src/book/service';
import { PrismaService } from 'src/prisma/service';
import { BookExchangeSessionsService } from './service';

@Module({
  providers: [PrismaService, BooksService, BookExchangeSessionsService],
})
export class BooksModule {}
