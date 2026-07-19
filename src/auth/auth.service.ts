import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<any> { // Promise<any>??
        const user = await this.userService.findByEmail(email);
        if(user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result; // result?
        }
        throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');
    }

    async login(user: any) { // user: any?
        const payload = { email: user.email, sub: user.id }; // payload?
        return { access_token: this.jwtService.sign(payload )};
    }
}
