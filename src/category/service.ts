import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/service';
import { CategoryDTO } from './dtos';

@Injectable()
export class CategoriesService {
  private readonly logger: Logger = new Logger(CategoriesService.name);
  constructor(private readonly prisma: PrismaService) {}
  async createCategory(dto: CategoryDTO) {
    try {
      return await this.prisma.category.create({ data: dto });
    } catch (error) {
      this.logger.error(error.message);
      throw new BadRequestException(error.message);
    }
  }

  async updateCategory(id: string, dto: CategoryDTO) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async toggleCategory(id: string, isActive: boolean) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: {
          isActive,
        },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteCategory(id: string) {
    try {
      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findCategory(id: string) {
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
