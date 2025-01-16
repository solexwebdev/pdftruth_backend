import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { AccountsResponse } from '@/accounts/responses/accounts.response';
import { Account } from '@/accounts/entities/account.entity';
import { Injectable } from '@nestjs/common';
import { AccountFactory } from '@/accounts/factories/account.factory';

@Injectable()
export class AccountsFactory extends BaseResponseFactory<Account[], AccountsResponse> {
  constructor(private readonly accountFactory: AccountFactory) {
    super();
  }

  public async createResponse(entity: Account[]): Promise<AccountsResponse> {
    return new AccountsResponse({
      items: await Promise.all(entity.map(async (account) => await this.accountFactory.createResponse(account))),
    });
  }
}
