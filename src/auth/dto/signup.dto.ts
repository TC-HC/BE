import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

export class SignupDto {
    @ApiProperty({ example: 'inforteam@gmail.com' }) email!: string;
    @ApiProperty({ example: '인포팀' }) name!: string;
    @ApiProperty({ example: 'password123' }) password!: string;
}