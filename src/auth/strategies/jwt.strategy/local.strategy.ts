import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(loginDto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user || !user.password) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 존재하지 않습니다.',
      );
    }

    const isValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 틀렸습니다.');
    }

    const { password, ...result } = user;
    return result;
  }
}
