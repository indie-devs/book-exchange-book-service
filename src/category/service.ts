import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/service';
import { categoryDTO } from './dtos';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async createCategory(dto: categoryDTO): Promise<Category> {
    try {
      return await this.prisma.category.create({ data: dto });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateCategory(id: number, dto: categoryDTO) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: { ...dto },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
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
      throw new InternalServerErrorException(error);
    }
  }

  async deleteCategory(id: number) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findCategory(id: number) {
    return await this.prisma.category.findFirst({
      where: { id, isActive: true },
    });
  }

  async findCategories() {
    return await this.prisma.category.findMany({
      where: { isActive: true },
    });
  }
}
