import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { AuthorService } from './service';

@Module({
  providers: [PrismaService, AuthorService],
})
export class AuthorModule {}
