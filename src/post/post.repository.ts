import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Category, Post, User } from '@prisma/client';
import { UserPostStat } from './types/UserPostStat.type';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const { title, content, published, categoryIds, CategoryNames } =
      createPostDto;
    return await this.prisma.post.create({
      data: {
        title: title,
        content: content,
        published: published ?? false, // null 병합 연산자
        author: {
          connect: { uuid: authorId },
        },
        categories: {
          connect: categoryIds?.map((id) => ({ id })) || [],
          connectOrCreate:
            CategoryNames?.map((name) => ({
              // name으로 찾아서 연결하되, 없을 경우 create하다
              where: { name: name },
              create: { name: name },
            })) || [], // 논리합 연산자, 좌항이 falsy한 값이면 우항의 빈 배열을
        },
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      include: {
        author: { select: { uuid: true, name: true, email: true } },
        categories: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id: id },
      include: {
        author: { select: { uuid: true, name: true, email: true } },
        categories: true,
      },
    });

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const { title, content, published } = updatePostDto;

    return this.prisma.post.update({
      where: { id: id },
      data: {
        title: title,
        content: content,
        published: published,
      },
    });
  }

  async delete(id: number): Promise<Post> {
    return await this.prisma.post.delete({
      where: { id: id },
    });
  }

  async findByCategoryId(categoryNames: string[]): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        subscribedCategories: { some: { name: { in: categoryNames } } },
      },
    });
  }

  async getUserPostStats(
    authorId: string,
    { page, limit }: PaginationDto,
  ): Promise<UserPostStat[]> {
    const skip = (page - 1) * limit;
    const posts = await this.prisma.post.findMany({
      where: { authorId },
      select: {
        id: true,
        title: true,
        createdAt: true,
        published: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });

    return posts;
  }
}
