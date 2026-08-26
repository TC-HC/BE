import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsArray, IsInt } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({ description: '게시글의 제목', example: '옛날부터 당신같은 남자를 기다려왔다우'})
    @IsString({ message: '제목은 문자열이어야 합니다.'})
    @IsNotEmpty()
    title!: string;
    
    @ApiProperty({ description: '게시글의 본문', example: '정말루?'})
    @IsString()
    @IsNotEmpty()
    content!: string;

    @ApiPropertyOptional({ description: '게시 여부', example: false})
    @IsBoolean()
    @IsOptional()
    published?: boolean;

    @ApiPropertyOptional({ description: '게시물 카테고리의 고유 ID 배열', example: [1, 2], type: [Number] })
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    categoryIds?: number[];

    @ApiPropertyOptional({ description: '새롭게 추가하는 카테고리의 이름 배열', example: ['나의순결한마음을', '짓밟다니'], type: [String] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    CategoryNames?: string[];
}
