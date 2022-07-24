import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { BooksService } from './service';

@Module({
  providers: [PrismaService, BooksService],
  exports: [BooksService]
})
export class BooksModule {}
