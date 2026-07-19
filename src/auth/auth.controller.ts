import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

class SignupDto {
    @ApiProperty({ example: 'inforteam@gmail.com' }) email!: string;
    @ApiProperty({ example: '인포팀' }) name!: string;
    @ApiProperty({ example: 'password123' }) password!: string;
}

class LoginDto {
    @ApiProperty({ example: 'infoteam@gmail.com' }) email!: string;
    @ApiProperty({ example: 'password123' }) password!: string;
}

@ApiTags('인증 (Auth)')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post('signup')
    @ApiOperation({ summary: '회원가입' })
    async signup(@Body() body: any) {
        return this.userService.create(body.email, body.name, body.password);
    }

    @Post('login')
    @ApiOperation(({ summary: '로그인 및 JWT 토큰 발급' }))
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.email, body.password)
        return this.authService.login(user);
    }
}
