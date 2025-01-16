import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { UserResponse } from '@/users/responses/user.response';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserFactory extends BaseResponseFactory<User, UserResponse> {
  createResponse(entity: User, options?: Record<string, undefined> | undefined): UserResponse | Promise<UserResponse> {
    return new UserResponse({
      id: entity.id,
      nickname: entity.nickname,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      status: entity.status,
      isEmailConfirmed: !entity.emailConfirmationToken,
      createdAt: entity.createdAt,
      ...options,
    });
  }
}
