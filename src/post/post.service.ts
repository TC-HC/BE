import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRepository } from './post.repository';
import { NotificationService } from '@app/notification';
import { Post, User } from '@prisma/client';
import { PostStatsResponse } from './types/PostStatsResponse.type';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: string): Promise<Post> {
    const post = await this.postRepository.create(createPostDto, authorId);

    const subscribers = await this.getSubscribers(createPostDto.CategoryNames!);
    const targetUserIds = subscribers
      .map((user) => user.uuid)
      .filter((uuid) => uuid !== authorId);

    if (targetUserIds.length > 0) {
      await this.notificationService.sendPushNotification(
        targetUserIds,
        post.title,
      );
    }

    return post;
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll();
  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne(id);

    if (!post) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    return post;
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
    authorId: string,
  ): Promise<Post> {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(`${id}번 게시글을 찾을 수 없습니다.`);
    }

    if (post.authorId !== authorId) {
      throw new ForbiddenException('본인의 게시글만 수정할 수 있습니다.');
    }

    return await this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number, authorId: string): Promise<Post> {
    const post = await this.findOne(id);

    if (!post) {
      throw new NotFoundException(
        '이미 삭제되었거나 존재하지 않는 게시글입니다.',
      );
    }

    if (post.authorId !== authorId) {
      throw new ForbiddenException('본인의 게시글만 삭제할 수 있습니다.');
    }

    return await this.postRepository.delete(id);
  }

  async getSubscribers(categoryNames: string[]): Promise<User[]> {
    return await this.postRepository.findByCategoryId(categoryNames);
  }

  async getUserPostStats(
    userId: string,
    { page, limit }: PaginationDto,
  ): Promise<PostStatsResponse> {
    const posts = await this.postRepository.getUserPostStats(userId, {
      page,
      limit,
    });
    return {
      data: posts,
      pagination: {
        page,
        limit,
      },
    };
  }
}
