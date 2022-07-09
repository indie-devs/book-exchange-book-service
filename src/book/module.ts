import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { BookService } from './service';

@Module({
  providers: [PrismaService, BookService],
})
export class BookModule {}
