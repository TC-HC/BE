import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { GoogleUserDto } from './dto/google_user.dto';
import type { SafeUser } from './auth.service';

@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
    ) {}

    @Post('signup')
    @ApiOperation({ summary: '회원가입' })
    async signup(@Body() body: SignupDto) {
        return this.userService.create(body);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation(({ summary: '로그인 및 JWT 토큰 발급' }))
    async login(@Body() body: SafeUser) {
        return this.authService.login(body);
    }

    @UseGuards(AuthGuard('google'))
    @Get('google')
    @ApiOperation({ summary: '구글 소셜 로그인 시작' })
    async googleAuth() {}

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    @ApiOperation({ summary: '구글 소셜 로그인 콜백 및 토큰 발급' })
    async googleAuthRedirect(@Req() req: Request) {
        const oauthUser = req.user as GoogleUserDto;
        const safeUser = await this.authService.googleValidate(oauthUser);

        return this.authService.login(safeUser);
    }
}
