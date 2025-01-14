import { Injectable } from '@nestjs/common';
import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Account } from '@/accounts/entities/account.entity';
import { AccountResponse } from '@/accounts/responses/account.response';

@Injectable()
export class AccountFactory extends BaseResponseFactory<
  Account,
  AccountResponse
> {
  public createResponse(
    entity: Account,
    options?: Record<string, undefined>,
  ): Promise<AccountResponse> | AccountResponse {
    return new AccountResponse({
      id: entity.id,
      name: entity.name,
      isDefault: !!entity.memberships?.find(
        (ms) => ms.account?.id === entity.id && ms.isDefault,
      ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      options: options,
    });
  }
}
