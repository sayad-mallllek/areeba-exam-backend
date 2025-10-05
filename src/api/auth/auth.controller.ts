import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import type { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) reply: FastifyReply,
  ) {
    const { tokens } = await this.authService.login(loginUserDto);

    reply.setCookie('access_token', tokens.accessToken, {
      httpOnly: true,
    });

    reply.setCookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
    });
  }
}
