import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Account } from '@/domains/accounts/entities/account.entity';
import { MyAccountResponse } from '@/domains/accounts/responses/my-account.response';
import { ProfileFactory } from '@/domains/users/factories/profile.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MyAccountFactory extends BaseResponseFactory<Account, MyAccountResponse> {
  constructor(private readonly profileFactory: ProfileFactory) {
    super();
  }

  public createResponse(
    entity: Account,
    options?: Record<string, undefined> | undefined,
  ): Promise<MyAccountResponse> | MyAccountResponse {
    const membership = entity.memberships?.find((ms) => ms.account?.id === entity.id && ms.isDefault);

    return new MyAccountResponse({
      id: entity.id,
      name: entity.name,
      isDefault: !!membership,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      ...options,
      ...(membership && {
        profile: this.profileFactory.createResponse({
          user: membership.user,
          role: membership.role,
        }),
      }),
    });
  }
}
