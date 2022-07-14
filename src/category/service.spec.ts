import { PrismaService } from 'src/prisma/service';
import { CategoriesService } from './service';
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';

describe('Category Service', () => {
  let categoryService: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();
    categoryService = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('createCategory', () => {
    it('should create category when dto is correct', async () => {
      const mockCategory = {
        id: 1,
        name: 'Test category',
        description: 'Test description',
        coverImage: 'Test url',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      prisma.category.create = jest.fn().mockResolvedValueOnce(mockCategory);

      expect(
        await categoryService.createCategory({ name: mockCategory.name }),
      ).toBe(mockCategory);
    });

    it('should throw Bad Request Exception when prisma throw error', async () => {
      const error = new Error('Prisma error');
      prisma.category.create = jest.fn().mockRejectedValueOnce(error);

      await expect(
        categoryService.createCategory({ name: 'test' }),
      ).rejects.toThrowError(new BadRequestException(error));
    });
  });
});
