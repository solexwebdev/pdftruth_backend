import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/domains/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const UserAuth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth(), ApiUnauthorizedResponse());
};
