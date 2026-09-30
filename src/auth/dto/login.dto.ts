import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LoginDto {
  @ApiProperty({ example: 'infoteam@gmail.com' })
  @IsEmail()
  @Type(() => String)
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @Type(() => String)
  password!: string;
}
