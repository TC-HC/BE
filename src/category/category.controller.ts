import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('카테고리 (Category)')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}


  @Get('stats')
  @ApiOperation({ summary: 'Category 상태 확인 '})
  async getCategoryStats() {
    return this.categoryService.getCategoryStats();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '사용자(본인)의 카테고리 구독 현황 확인 및 게시글 작성 현황'})
  @Get('me/subscriptions')
  async getMySubscriptionStats(@Req() req) {
    const userId = req.user.uuid;
    return this.categoryService.getMySubscriptionStats(userId);
  }

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

  @Delete(':name')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Category 삭제'})
  remove(@Param('name') name: string) {
    return this.categoryService.remove(name);
  }


}
