import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("Make")
  mkPost(): string{
    return this.appService.mkPost();
  }

  @Post("Update")
  upPost(): string{
    return this.appService.upPost();
  }

  @Get("Remove")
  rmPost(): string{
    return this.appService.rmPost();
  }

  @Get("Check")
  checkPost(): string{
    return this.appService.checkPost();
  }
}
