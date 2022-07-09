import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async createCategory(dto: Prisma.CategoryCreateInput) {
    try {
      const category = await this.prisma.category.create({ data: dto });
      return category;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async updateCategory(id: number, dto: Prisma.CategoryUpdateInput) {
    try {
      const category = await this.prisma.category.update({
        where: {
          id: +id,
        },
        data: { ...dto },
      });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async toggleCategory(id: number, isDisable: boolean) {
    try {
      const category = await this.prisma.category.update({
        where: { id: +id },
        data: {
          isDisable,
        },
      });
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async delete(id: number) {
    try {
      await this.prisma.category.delete({
        where: { id: +id },
      });
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async findCategory(id: number) {
    const category = await this.prisma.category.findFirst({
      where: { id: +id, isDisable: false },
    });
    return category;
  }
  async findCategories() {
    const categories = await this.prisma.category.findMany({
      where: { isDisable: false },
    });
    return categories;
  }
}
