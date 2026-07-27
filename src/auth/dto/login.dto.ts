import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ example: 'infoteam@gmail.com' }) email!: string;
    @ApiProperty({ example: 'password123' }) password!: string;
}