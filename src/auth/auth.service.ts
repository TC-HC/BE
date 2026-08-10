import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { User } from '@prisma/client';
import { GoogleUserDto } from './dto/google_user.dto';
import { LoginDto } from './dto/login.dto';

export type SafeUser = Omit<User, 'password'>; // Omit(a, 'b') : a에서 b를 뺀 객체

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository,
    ) {}

    async validateUser(dto: LoginDto): Promise<SafeUser> {
        const user = await this.userService.findByEmail(dto.email);
        if(user && user.password && (await bcrypt.compare(dto.password, user.password!))) {
            const { password, ...result } = user; // ...result -> password를 제외한 데이터를 result라는 변수에 담다
            return result;
        }
        throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');
    }

    async googleValidate(reqUser: GoogleUserDto): Promise<User> {
        if(!reqUser || !reqUser.email){
            throw new UnauthorizedException('유효한 구글 프로필이 없습니다.');
        }

        try {
            const user = await this.authRepository.upsertOauthUser(
                reqUser.email,
                reqUser.name!,
                reqUser.provider
            );

            return user;
        } catch (error) {
            throw new InternalServerErrorException('구글 로그인 처리 중 오류가 발생했습니다.')
        }
    }

    async login(user: SafeUser) {
        const payload = { email: user.email, sub: user.uuid };
        return { access_token: this.jwtService.sign(payload)};
    }
}
