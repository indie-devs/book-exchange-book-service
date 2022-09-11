import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { BookController } from './controller';
import { BooksService } from './service';

@Module({
  controllers: [BookController],
  providers: [PrismaService, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
