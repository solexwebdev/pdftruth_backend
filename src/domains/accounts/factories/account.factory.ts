import { Injectable } from '@nestjs/common';
import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Account } from '@/domains/accounts/entities/account.entity';
import { AccountResponse } from '@/domains/accounts/responses/account.response';
import { MyAccountResponse } from '@/domains/accounts/responses/my-account.response';

@Injectable()
export class AccountFactory extends BaseResponseFactory<Account, AccountResponse> {
  public createResponse(entity: Account, options?: Record<string, undefined>): MyAccountResponse | AccountResponse {
    const membership = entity.memberships?.find((ms) => ms.account?.id === entity.id && ms.isDefault);

    return new AccountResponse({
      id: entity.id,
      name: entity.name,
      isDefault: !!membership,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      ...options,
    });
  }
}
