import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express'
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { GoogleUserDto } from './dto/google_user.dto';

@ApiTags('소셜 인증 (Oauth)')
@Controller('oauth')
export class OAuthController {
    constructor(private readonly authService: AuthService) {}

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

    @UseGuards(AuthGuard('jwt'))
    @Get('userInfo')
    @ApiOperation({ summary: '정보 조회' })
    async getUserInfo(@Req() req: Request) {
        return req.user;
    }
}
