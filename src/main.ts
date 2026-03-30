import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {  // 서버를 시작하는 함수
  const app = await NestFactory.create(AppModule); // AppModule 기반 서버 생성
  await app.listen(process.env.PORT ?? 3000); // Port가 지정되어 있다면 그곳에서 서버 실행, 그렇지 않을 경우 3000포트에서 서버 실행
}
bootstrap();
