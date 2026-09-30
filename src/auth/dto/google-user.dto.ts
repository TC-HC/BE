import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

@Injectable()
export class GoogleUserDto {
  @IsEmail()
  @Type(() => String)
  email!: string;

  @IsString()
  @Type(() => String)
  name!: string;

  @IsString()
  @Type(() => String)
  provider!: string;

  @IsString()
  @Type(() => String)
  providerId!: string;
}
