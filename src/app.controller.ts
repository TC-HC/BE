import { Controller, Get, Post, Body, Put, Delete, Param, NotFoundException } from '@nestjs/common';
import { AppService, post } from './app.service';
import { CreatePostDto } from './dto/create-post.dto'
import { NotFoundError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("Make")
  mkPost(@Body() dto: CreatePostDto){
    return this.appService.mkPost(dto);
  }

  @Put("Update")
  upPost(@Body() dto: CreatePostDto){
    return this.appService.upPost(dto);
  }

  @Delete("Delete")
  rmPost(@Body() dto: CreatePostDto){
    return this.appService.rmPost(dto);
  }

  @Get("Check/:postID")
  checkPost(@Param('postID') postID: number){
    const post = this.appService.checkPost(postID);
    if(!post) throw new NotFoundException('Post not found');
    return post;
  }
}
