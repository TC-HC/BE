import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { HttpStatus } from '@nestjs/common';
import { GetUser } from './decorators/get-user.decorator';
import type { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { loginResultType } from './types/login-result.type';

@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SignupDto })
  async signup(@Body() body: SignupDto): Promise<User> {
    return this.userService.create(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: '로그인 및 JWT 토큰 발급' })
  @ApiBody({ type: LoginDto })
  async login(@GetUser() user: User): Promise<loginResultType> {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '로그아웃' })
  @ApiBearerAuth()
  async logout(@Req() req: Request) {
    return {
      statusCode: 200,
      message: '성공적으로 로그아웃되었습니다. client에서 토큰을 삭제해주세요.',
    };
  }
}
