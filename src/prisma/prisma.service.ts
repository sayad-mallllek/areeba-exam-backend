import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// Note: Run 'pnpm prisma:generate' to generate the Prisma Client before building
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
