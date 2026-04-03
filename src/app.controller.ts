import { Controller, Get, Post, Body, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePostDto } from './dto/create-post.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("Make")
  mkPost(@Body() post){
    return this.appService.mkPost(post);
  }

  @Put("Update")
  upPost(@Body() post){
    return this.appService.upPost(post.postID, post.userID, post.title, post.content);3
  }

  @Delete("Remove")
  rmPost(@Body() post): {
    return ;
  }

  @Get("Check")
  checkPost(@Body() post){
    return this.appService.checkPost(post.postID);
  }
}
