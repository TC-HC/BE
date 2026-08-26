import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const { title, content, published, categoryIds, CategoryNames } = createPostDto;
    return this.prisma.post.create({
        data: {
          title: title,
          content: content,
          published: published ?? false, // null 병합 연산자
          author: {
            connect: { uuid: authorId },
          },
          categories: {
            connect: categoryIds?.map ((id) => ({ id })) || [],
            connectOrCreate: CategoryNames?.map((name) => ({ // name으로 찾아서 연결하되, 없을 경우 create하다
              where: { name: name },
              create: { name: name },
            })) || [], // 논리합 연산자, 좌항이 falsy한 값이면 우항의 빈 배열을
          },
        },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: { select: { uuid: true, name: true, email: true }},
        categories: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
  
  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
        where: { id: id },
        include: {
            author: {select: { uuid: true, name: true, email: true }},
            categories: true,
        },
    });

    return post;
  }

    async update(id: number, updatePostDto: UpdatePostDto) {
        const post = await this.findOne(id);

        const { title, content, published } = updatePostDto;

        return this.prisma.post.update({
            where: { id: id },
            data: {
                title: title,
                content: content,
                published: published,
            },
        });
    }

    async delete(id: number) {
        return this.prisma.post.delete({
            where: { id: id },
        });
    }
}