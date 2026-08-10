import { PassportStrategy } from "@nestjs/passport";
import { Strategy, Profile } from "passport-google-oauth20";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "src/auth/auth.service";
import { GoogleUserDto } from "src/auth/dto/google_user.dto";
import { User } from "@prisma/client";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService
    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
        const email = profile.emails?.[0]?.value;
        if(!email){
            throw new UnauthorizedException('구글 프로필에서 이메일을 찾을 수 없습니다.');
        }

        const reqUser: GoogleUserDto = {
            email: email,
            name: profile.name?.givenName || 'Unknown',
            provider: 'google',
        }

        return this.authService.googleValidate(reqUser);
        // done(null, user); // callback function, 호출되면 반환값이 컨트롤러의 req.user에 담기다
    }
}