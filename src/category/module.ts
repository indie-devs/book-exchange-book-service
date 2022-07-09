import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { CategoryService } from './service';

@Module({
  providers: [PrismaService, CategoryService],
})
export class CategoryModule {}
