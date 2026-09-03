import { Injectable } from "@nestjs/common";
import { Category } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CategoryRepository {
    constructor(private readonly prisma: PrismaService) {}

    async create(name: string){
        return this.prisma.category.create({
            data: {
                name: name
            }
        });
    }

    async findAll(): Promise <Category[]> {
        return await this.prisma.category.findMany({
            select: {
                id: true,
                name: true
            },
            orderBy: {
                id: 'desc' // 최근 생성된 category부터
            }
        });
    }

    async findOne(name: string): Promise <Category | null> {
        return await this.prisma.category.findUnique({
            select: {
                id: true,
                name: true
            },
            where: { name: name }
        });
    }

    async Remove(name: string) {
        return await this.prisma.category.delete({ where: { name: name }});
    }

    async getCategoryStats() {
        return this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        posts: true,
                        subscribers: true,
                    }
                }
            },
            orderBy: { id: 'asc' }
        });
    }

    async getMySubscriptionStats(userId: string) {
        return this.prisma.category.findMany({
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        posts: { where: { authorId: userId }},
                        subscribers: { where: { uuid: userId }}
                    }
                }
            },
            orderBy: { id: 'asc' }
        });
    }
}