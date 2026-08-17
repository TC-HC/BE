import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@ApiTags('카테고리 (Category)')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Category 생성' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto.name);
  }

  @Get()
  @ApiOperation({ summary: '전체 Category 조회'})
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: '특정 Category 조회' })
  findOne(@Param('name') name: string) {
    return this.categoryService.findOne(name);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Category 삭제'})
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name);
  }
}
