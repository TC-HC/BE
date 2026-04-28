import { Controller, Get, Post, Body, Put, Delete } from '@nestjs/common';
import { AppService, post } from './app.service';
import { CreatePostDto } from './dto/create-post.dto'

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

  @Get("Check")
  checkPost(@Body() dto: CreatePostDto){
    return this.appService.checkPost(dto);
  }
}
