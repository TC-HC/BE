import {
  Injectable,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Category, Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SubscribeCategoryResponse } from './types/SubscribeCategory.type';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('존재하지 않는 이메일입니다.');
    }

    return user;
  }

  async create(signupDto: SignupDto): Promise<User> {
    const { email, name, password } = signupDto;

    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return this.userRepository.create({
      email: email,
      name: name,
      password: hashedPassword,
    });
  }

  async subscribeCategory(
    uuid: string,
    categoryName: string,
  ): Promise<SubscribeCategoryResponse> {
    try {
      return await this.userRepository.subscribeCategory(uuid, categoryName);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `${categoryName} 카테고리를 찾을 수 없습니다.`,
          );
        }
      }
    }
    throw new InternalServerErrorException(
      '카테고리 구독 중 문제가 발생했습니다.',
    );
  }

  async unsubscribeCategory(
    uuid: string,
    categoryName: string,
  ): Promise<SubscribeCategoryResponse> {
    try {
      return this.userRepository.unsubscribeCategory(uuid, categoryName);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `${categoryName} 카테고리를 찾을 수 없습니다.`,
          );
        }
      }
    }
    throw new InternalServerErrorException(
      '카테고리 구독 취소 중 문제가 발생했습니다.',
    );
  }
}
