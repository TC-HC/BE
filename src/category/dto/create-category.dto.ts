import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateCategoryDto {
    @ApiProperty({ description: '카테고리의 이름', example: 'GIST' })
    @IsString()
    @IsNotEmpty()
    name!: string;
}
