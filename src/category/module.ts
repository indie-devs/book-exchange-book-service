import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { CategoriesService } from './service';

@Module({
  providers: [PrismaService, CategoriesService],
})
export class CategoriesModule {}
