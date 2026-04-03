import { IsString, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class CreatePostDto {
    @Type(() => Number)
    @IsNumber()
    postID: number = 0;

    @Type(() => Number)
    @IsNumber()
    userID: number = 0;

    @IsString()
    writer?: string;

    @IsString()
    title?: string;

    @IsString()
    content?: string;
}