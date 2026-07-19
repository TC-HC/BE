import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import prismaConfig from 'prisma.config';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
