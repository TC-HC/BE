import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({ data });   
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async findById(uuid: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { uuid },
        });
    }

    async findByCategoryId(categoryNames: string[]) {
        return this.prisma.user.findMany({
            where: {
                subscribedCategories: { some: { name: { in: categoryNames } }}
            }
        })
    }

    async subscribeCategory(uuid: string, categoryName: string) {
        try {
                return await this.prisma.user.update({
                where: { uuid: uuid },
                data: {
                    subscribedCategories: {
                        connect: { name: categoryName }
                    }
                },
                select: {
                    uuid: true,
                    email: true,
                    name: true,
                    role: true,
                    subscribedCategories: true
                }
            });
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'P2025') {
                    throw new NotFoundException(`${categoryName}을 찾을 수 없습니다.`);
                
                }
            }
        }
    }

        async unsubscribeCategory(uuid: string, categoryName: string) {
        return await this.prisma.user.update({
            where: { uuid: uuid },
            data: {
                subscribedCategories: {
                    disconnect: { name: categoryName }
                }
            },
            select: {
                uuid: true,
                email: true,
                name: true,
                role: true,
                subscribedCategories: true
            }
        });
    }
}