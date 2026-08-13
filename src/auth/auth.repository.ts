import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { User } from '@prisma/client'

@Injectable()
export class AuthRepository {
    private readonly logger = new Logger(AuthRepository.name);
    constructor(private readonly prismaService: PrismaService) {}

    async upsertOauthUser(email: string, name: string, provider: string, providerId: string): Promise<User> {
        try {
            return await this.prismaService.user.upsert({
                where: { email: email },
                update: {
                    name: name,
                    providerId: providerId,
                    providers: [provider]
                },
                create: { 
                    email: email,
                    name: name,
                    providers: [provider],
                    providerId: providerId
                },
            });
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError) {
                this.logger.error(`Prisma Error: ${error.message}`);
                throw new Error('Databaseoperation failed during user upsert.');
            }

            this.logger.error(`Unknown DB Error: ${error}`);
            throw new Error('Unknown database error occurred.');
        }
    }
}