import { Logger } from '@nestjs/common';
import { authors, books, categories } from './mock/data';
import { PrismaService } from '../src/prisma/service';

const seeding = async () => {
  if (process.env.NODE_ENV === 'production') return;
  const prisma = new PrismaService();
  const logger = new Logger();
  try {
    prisma.cleanDatabase();
    await prisma.category.createMany({
      data: categories,
    });
    await prisma.author.createMany({
      data: authors,
    });
    await prisma.book.createMany({
      data: books,
    });
  } catch (error) {
    logger.error(error);
    process.exit(1);
  } finally {
    prisma.$disconnect();
  }
};

seeding();
