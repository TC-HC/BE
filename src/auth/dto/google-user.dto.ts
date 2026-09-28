import { Injectable } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";

@Injectable()
export class GoogleUserDto {
    @IsEmail()
    email!: string;

    @IsString()
    name!: string;

    @IsString()
    provider!: string;

    @IsString()
    providerId!: string;
}