import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! This is a NestJS backend with Fastify, Prisma, and pnpm!';
  }

  createUser(createUserDto: CreateUserDto) {
    return {
      message: 'User would be created with Prisma',
      data: createUserDto,
    };
  }
}
