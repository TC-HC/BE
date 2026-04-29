import { IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({description: '게시글 ID', example: 1})
    @Type(() => Number)
    @IsNumber()
    postID: number = 0;

    @ApiProperty({description: '사용자 ID', example: 1})
    @Type(() => Number)
    @IsNumber()
    userID: number = 0;

    @ApiProperty({description: '글쓴이', example: "밥먹자"})
    @IsString()
    writer?: string;

    @ApiProperty({description: '제목', example: "우유사러가야하는데"})
    @IsString()
    title?: string;

    @ApiProperty({description: '내용', example: "빵을먹어야만한다...!"})
    @IsString()
    content?: string;
}