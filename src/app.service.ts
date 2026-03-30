import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  mkPost(): string {
    return "";
  }

  upPost(): string {
    return "";
  }

  rmPost(): string{
    return "";
  }

  checkPost(): string{
    return "";
  }
}
