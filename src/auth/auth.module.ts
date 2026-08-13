import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { OAuthController } from './oauth.controller';
import { LocalStrategy } from './strategies/jwt.strategy/local.strategy';
import { GoogleStrategy } from './strategies/jwt.strategy/google.strategy';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      })
    }),
    PrismaModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    GoogleStrategy,
    AuthRepository
  ],
  controllers: [AuthController, OAuthController]
})
export class AuthModule {}
