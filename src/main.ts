import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  // DTO에 정의되지 않은 데이터 필터링
    forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성 요청 시 에러 발생
    transform: true,  // 클라이언트가 보낸 데이터를 DTO 클래스 타입으로 변환
  }),
);

  const config = new DocumentBuilder()
  .setTitle('API 명세서')
  .setDescription('게시판 API OpenAPI')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  writeFileSync('./swagger-spec.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:3000`);
  console.log(`Swagger spec generated at: ./swagger-spec.json`);
}
bootstrap();
