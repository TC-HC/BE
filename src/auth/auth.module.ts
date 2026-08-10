import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/jwt.strategy/local.strategy';
import { GoogleStrategy } from './strategies/jwt.strategy/google.strategy';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m'},
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    AuthRepository

  ],
  controllers: [AuthController]
})
export class AuthModule {}
