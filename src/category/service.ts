import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { CategoryDTO } from './dtos';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async createCategory(dto: CategoryDTO) {
    try {
      return await this.prisma.category.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateCategory(id: number, dto: CategoryDTO) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async toggleCategory(id: number, isActive: boolean) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          isActive,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCategory(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findCategory(id: number) {
    return await this.prisma.category.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        books: {
          where: {
            isActive: true,
          },
        },
      },
    });
  }

  async findCategories() {
    return await this.prisma.category.findMany({
      where: { isActive: true },
    });
  }
}
