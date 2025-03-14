import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from '@/domains/auth/services/auth.service';
import { UsersModule } from '@/domains/users/users.module';
import { CommonModule } from '@/common/common.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { JwtAuthGuard } from '@/domains/auth/guards/jwt-auth.guard';
import { AuthResponseFactory } from '@/domains/auth/factories/auth-response.factory';
import { GoogleAuthClientService } from '@/domains/auth/services/google-auth-client.service';

@Module({
  imports: [
    UsersModule,
    CommonModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigEnv.JWT_SECRET_KEY),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleAuthClientService, JwtAuthGuard, AuthResponseFactory],
})
export class AuthModule {}
