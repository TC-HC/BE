import { Post, Param, Req, Controller } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import type { User } from '@prisma/client';
import { SubscribeCategoryResponse } from './types/SubscribeCategory.type';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@ApiTags('유저 (User)')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('me/categories/:categoryName/subscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Category 구독' })
  subscribeCategory(
    @Param('categoryName') categoryName: string,
    @GetUser() user: User,
  ): Promise<SubscribeCategoryResponse> {
    const uuid = user.uuid;

    return this.usersService.subscribeCategory(uuid, categoryName);
  }

  @Post('me/categories/:categoryName/unsubscribe')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Category 구독 취소' })
  unsubscribeCategory(
    @Param('categoryName') categoryName: string,
    @GetUser() user: User,
  ): Promise<SubscribeCategoryResponse> {
    const uuid = user.uuid;

    return this.usersService.unsubscribeCategory(uuid, categoryName);
  }
}
