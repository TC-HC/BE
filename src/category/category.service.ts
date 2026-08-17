import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoryRepository: CategoryRepository
  ) {}


  async create(name: string) {
    const existCategory = await this.prisma.category.findUnique({ where: { name: name } });

    if(existCategory) {
      throw new ConflictException(`${name}은 이미 존재하는 카테고리입니다.`);
    }

    return this.categoryRepository.create(name);
  }

  async findAll() {
    return this.categoryRepository.findAll();
  }

  async findOne(name: string) {
    const existCategory = this.categoryRepository.findOne(name);

    if(!existCategory) {
      throw new NotFoundException(`${name} 카테고리를 찾을 수 없습니다.`);
    }

    return existCategory;
  }

  async remove(name: string) {
    const existCategory = this.categoryRepository.findOne(name);

    if(!existCategory) {
      throw new NotFoundException(`${name} 카테고리를 찾을 수 없습니다.`);
    }

    return existCategory;
  }
}
