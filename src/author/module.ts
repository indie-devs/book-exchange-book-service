import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { AuthorsService } from './service';

@Module({
  providers: [PrismaService, AuthorsService],
})
export class AuthorsModule {}
