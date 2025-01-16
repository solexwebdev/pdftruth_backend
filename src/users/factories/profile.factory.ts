import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { ProfileResponse } from '@/users/responses/profile.response';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/users/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { UserFactory } from '@/users/factories/user.factory';
import { RoleFactory } from '@/users/factories/role.factory';

@Injectable()
export class ProfileFactory extends BaseResponseFactory<{ user: User; role: Role }, ProfileResponse> {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly roleFactory: RoleFactory,
  ) {
    super();
  }

  createResponse(
    entity: { user: User; role: Role },
    options?: Record<string, undefined> | undefined,
  ): ProfileResponse | Promise<ProfileResponse> {
    return new ProfileResponse({
      user: this.userFactory.createResponse(entity.user),
      role: this.roleFactory.createResponse(entity.role),
      ...options,
    });
  }
}
