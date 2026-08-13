import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
    sub: string;
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 토큰 만료 시 401 Unauthorized error
            secretOrKey: configService.get<string>('JWT_SECRET')!, // secretOrKey를 이용하여 서명을 만든 후 토큰에 넣다
        });
    }

    async validate(payload: JwtPayload){
        return { userId: payload.sub, email: payload.email, name: payload.name };
    }
}
