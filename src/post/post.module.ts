import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostRepository } from './post.repository';
import { UsersModule } from 'src/users/users.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [PrismaModule, UsersModule, NotificationModule],
  controllers: [PostController],
  providers: [
    PostService,
    PostRepository
  ],
})
export class PostModule {}
