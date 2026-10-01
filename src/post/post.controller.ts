import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import type { Post as PostType, User } from '@prisma/client';
import { PostStatsResponse } from './types/PostStatsResponse.type';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('게시글 (Post)')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: '유저 게시글 조회' })
  getUserPostStats(
    @GetUser() user: User,
    @Query() query: PaginationDto,
  ): Promise<PostStatsResponse> {
    const userId = user.uuid;
    const page = query.page;
    const limit = query.limit;

    return this.postService.getUserPostStats(userId, { page, limit });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 작성' })
  create(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostType> {
    return this.postService.create(createPostDto, user.uuid);
  }

  @Get()
  @ApiOperation({ summary: '전체 게시글 조회' })
  findAll(): Promise<PostType[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '단일 게시글 조회' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<PostType | null> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 수정' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
    @GetUser() user: User,
  ): Promise<PostType> {
    return this.postService.update(id, updatePostDto, user.uuid);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '게시글 삭제' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PostType> {
    return this.postService.remove(id, user.uuid);
  }
}
