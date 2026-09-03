import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('게시글 (Post)')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: '유저 게시글 조회' })
  async getUserPostStats(
    @Req() req,
    @Query() query: PaginationDto
  ) {
    const userId = req.user.uuid;
    return this.postService.getUserPostStats(userId, query.page, query.limit);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // 토큰 인증이 필요한 API 엔드포인트를 자물쇠 아이콘으로 표시, 인증 테스트 지원
  @ApiOperation({ summary: '게시글 작성' })
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postService.create(createPostDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '단일 게시글 조회' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정' })
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Req() req: any) {
    return this.postService.update(id, updatePostDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.postService.remove(id, req.user.userId);
  }
}
