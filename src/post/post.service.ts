import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostRepository } from './post.repository';
import { NotificationService } from 'src/notification/notification.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly usersService: UsersService
  ) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const post = await this.postRepository.create(createPostDto, authorId);

    const subscribers = await this.usersService.getSubscribers(createPostDto.CategoryNames!)
    const targetUserIds = subscribers.map(user => user.uuid).filter(uuid => uuid !== authorId);

    if(targetUserIds.length > 0) {
      this.notificationService.sendPushNotification(
        subscribers.map(user => user.uuid),
        post.title
      );
    }

    
    return post
  }

  async findAll() {
    return this.postRepository.findAll();
  }

  async findOne(id: number) {
        const post = await this.prisma.post.findUnique({
        where: { id: id },
        include: {
            author: {select: { uuid: true, name: true, email: true }},
            categories: true,
        },
    });

    if(!post){
      throw new NotFoundException('${id}번 게시글을 찾을 수 없습니다.');
    }

    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, authorId: string) {
    const post = await this.findOne(id);

    if(post.authorId !== authorId){
      throw new ForbiddenException('본인의 게시글만 수정할 수 있습니다.');
    }

    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: number, authorId: string) {  // id: post의 고유한 id, authorId: 삭제를 요청한 user의 고유한 uuid
    const post = await this.findOne(id);

    if(!post) {
      throw new NotFoundException('이미 삭제되었거나 존재하지 않는 게시글입니다.');
    }

    if(post.authorId !== authorId) {
      throw new ForbiddenException('본인의 게시글만 삭제할 수 있습니다.');
    }

    return this.postRepository.delete(id);
  }
}
