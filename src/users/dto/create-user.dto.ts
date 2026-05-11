import { IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({description: "ID of user", example: "giddlfdka"})
    @Type(() => String)
    @IsString()
    email : string = "";

    @ApiProperty({description: "Password of user", example: "Letsgo123!"})
    @Type(() => String)
    @IsString()
    password : string = "";

    @ApiProperty({description: "Name that present user", example: "26김희찬"})
    @Type(() => String)
    @IsString()
    name : string = "";
}