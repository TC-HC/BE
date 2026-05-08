import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {  // 서버를 시작하는 함수
  const app = await NestFactory.create(AppModule); // AppModule 기반 서버 생성

  const config = new DocumentBuilder()
  .setTitle('My-Project')
  .setDescription('API TEST')
  .setVersion('1.0')
  .addTag('posts')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  await app.listen(process.env.PORT ?? 3000); // Port가 지정되어 있다면 그곳에서 서버 실행, 그렇지 않을 경우 3000포트에서 서버 실행
}
bootstrap();
