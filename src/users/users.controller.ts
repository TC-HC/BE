import { Post, Param, Req } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth/jwt-auth.guard";
import { UseGuards } from "@nestjs/common";

@ApiTags('유저 (User)')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('me/categories/:categoryName')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Category 구독' })
    subscribeCategory(
        @Param('categoryName') categoryName: string,
        @Req() req
    ) {
        const uuid = req.user.uuid;

        return this.usersService.subscribeCategory(uuid, categoryName);
    }

    @Post('me/categories/:categoryName')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Category 구독' })
    unsubscribeCategory(
        @Param('categoryName') categoryName: string,
        @Req() req
    ) {
        const uuid = req.user.uuid;

        return this.usersService.unsubscribeCategory(uuid, categoryName);
    }
}
