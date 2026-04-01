import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("Make")
  mkPost(@Body() post){
    return this.appService.mkPost(post.postID, post.userID, post.writer, post.title, post.content);
  }

  @Post("Update")
  upPost(@Body() post){
    return this.appService.upPost(post.postID, post.userID);
  }

  @Post("Remove")
  rmPost(): string{
    return this.appService.rmPost();
  }

  @Get("Check")
  checkPost(): string{
    return this.appService.checkPost();
  }
}
