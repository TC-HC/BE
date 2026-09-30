import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'infoteam@gmail.com' })
  @IsEmail({}, { message: '올바른 이메일 형식이 아닙니다.' })
  @IsNotEmpty({ message: '이메일은 필수 입력값입니다.' })
  email!: string;

  @ApiProperty({ example: '인포팀' })
  @IsString({ message: '이름은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: '이름은 필수 입력값입니다.' })
  name!: string;

  @ApiProperty({ example: 'password123' })
  @IsString({ message: '비밀번호는 문자열이여야 합니다.' })
  @IsNotEmpty({ message: '비밀번호는 필수 입력값입니다.' })
  password!: string;
}
