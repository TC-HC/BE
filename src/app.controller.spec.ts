import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService, post } from './app.service';
import { CreatePostDto } from './dto/create-post.dto'
import { Post } from '@nestjs/common';

const dto = new CreatePostDto;
dto.postID

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Make post', () => {
    it('return information of post', () => {
      expect(appController.mkPost(dto)).toBe(dto);
    });
  });

  describe('Remove post', () => {
    it('return delete message', () => {
      expect(appController.rmPost(dto)).toBe("deleted");
    })
  })

  describe('Update post', () => {
    it('return update message', () => {
      expect(appController.upPost(dto)).toBe("updated")
    })
  })

  describe('Check information of post', () => {
    it('return matching post', () => {
      expect(appController.checkPost(dto)).toBe(dto)
    })
  })
  
  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });

});
