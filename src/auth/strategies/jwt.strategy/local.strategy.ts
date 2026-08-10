import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, pass: string): Promise<any> {
        const user = await this.authService.validateUser(email, pass);
        
        if(!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 존재하지 않습니다.');
        }

        return user;
    }
}