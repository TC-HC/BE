import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post('signup')
    @ApiOperation({ summary: '회원가입' })
    async signup(@Body() body: SignupDto) {
        return this.userService.create(body);
    }

    @Post('login')
    @ApiOperation(({ summary: '로그인 및 JWT 토큰 발급' }))
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.email, body.password)
        return this.authService.login(user);
    }
}
