import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/integrations/database/database.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtConfig } from 'src/common/config/jwt.config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: JwtConfig.secret,
      signOptions: { expiresIn: JwtConfig.accessExpiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
