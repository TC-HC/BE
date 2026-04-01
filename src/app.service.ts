import { Injectable } from '@nestjs/common';

export interface post{
  postID: number;
  userID: number;
  writer?: string;
  title?: string;
  content?: string;
};

@Injectable()
export class AppService {
  
  getHello(): string {
    return 'Hello World!';
  }

  mkPost(postID: number, userID: number, writer, title, content) {
    const post: post = {postID: postID, userID: userID, writer : writer, title : title, content : content};
    return post;
  }

  upPost(postID: number, userID: number) {
    return "";
  }

  rmPost(): string{
    return "";
  }

  checkPost(): string{
    return "";
  }
}
