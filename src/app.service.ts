import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto'

export interface post{
  postID: number;
  userID: number;
  writer?: string;
  title?: string;
  content?: string;
};

@Injectable()
export class AppService {
  private posts: post[] = [{
    postID: 1,
    userID: 1,
    writer: "Choi",
    title: "첫 글",
    content: "Hello World",
  },
];
  
  getHello(): string {
    return 'Hello World!';
  }

  private toPost(dto: CreatePostDto) : post {
    return {
      postID: dto.postID,
      userID: dto.userID,
      writer: dto.writer,
      title: dto.title,
      content: dto.content
    };
  }

  mkPost(dto: CreatePostDto) {
    const post:post = this.toPost(dto);
    this.posts.push(post)
    return post;
  }

  upPost(postID: number, userID: number, title, content) {
    return ;
  }

  rmPost(postID: number) {
    this.posts = this.posts.filter(p => p.postID !== postID);
    return "deleted";
  }

  checkPost(postID: number) {
    return this.posts.find(p => p.postID === postID);
  }
}
