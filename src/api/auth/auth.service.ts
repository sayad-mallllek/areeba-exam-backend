import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/integrations/database/database.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtConfig } from 'src/common/config/jwt.config';
import { comparePasswords } from 'src/utils/auth.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateAccessAndRefreshToken(id: number) {
    const payload = { id };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: JwtConfig.refreshExpiresIn,
      }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.databaseService.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        auths: {
          where: { active: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            password: true,
          },
        },
      },
    });

    if (!user || user.auths.length === 0) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const [{ password: hashedPassword }] = user.auths;

    const isPasswordValid = await comparePasswords(password, hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const tokens = await this.generateAccessAndRefreshToken(user.id);

    return {
      tokens,
    };
  }
}
