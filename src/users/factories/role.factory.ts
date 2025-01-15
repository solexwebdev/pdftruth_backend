import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { RoleResponse } from '@/users/responses/role.response';
import { Role } from '@/users/entities/role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleFactory extends BaseResponseFactory<Role, RoleResponse> {
  public createResponse(
    entity: Role,
    options?: Record<string, undefined> | undefined,
  ): Promise<RoleResponse> | RoleResponse {
    return new RoleResponse({
      id: entity.id,
      name: entity.name,
      ...options,
    });
  }
}
