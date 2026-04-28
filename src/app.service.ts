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
    const post: post = this.toPost(dto);
    this.posts.push(post)
    return post;
  }

  upPost(dto: CreatePostDto) {
    const post = this.posts.find(p => p.postID === dto.postID)
    if(post){
      post.title = dto.title;
      post.content = dto.content;
      return "updated"
    }
    else return "post not found";
  }

  rmPost(dto: CreatePostDto) {
    this.posts = this.posts.filter(p => p.postID !== dto.postID);
    return "deleted";
  }

  checkPost(dto: CreatePostDto) {
    return this.posts.find(p => p.postID === dto.postID);
  }
}
