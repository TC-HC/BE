import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreatePostDto } from './dto/create-post.dto'

const dto = new CreatePostDto();
dto.postID = 1;
dto.userID = 1;
dto.writer = "Choi";
dto.title = "첫 글";
dto.content = "Hello World"

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
      expect(appController.mkPost(dto)).toEqual("postID duplicated..");
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
      expect(appController.checkPost(dto.postID)).toEqual(dto)
    })
  })
  
});
