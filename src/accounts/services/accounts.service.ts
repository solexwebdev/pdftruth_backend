import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Account } from '@/accounts/entities/account.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ICreateAccount } from '@/accounts/interfaces/create-account.interface';
import { IdType } from '@/common/types/id.type';
import { UpdateAccountDto } from '@/accounts/dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
    private readonly em: EntityManager,
  ) {}

  public async getUserAccounts(userId: IdType): Promise<Account[]> {
    const accounts = await this.accountRepository.find(
      { memberships: { user: { id: userId } } },
      { populate: ['memberships.role'] },
    );

    return accounts;
  }

  public async getDefaultAccount(userId: IdType): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail(
      { memberships: { isDefault: true, user: { id: userId } } },
      { populate: ['memberships.role'] },
    );

    return account;
  }

  public async save(payload: ICreateAccount): Promise<Account> {
    const account = new Account({ ...(payload as ICreateAccount) });
    await this.em.persistAndFlush(account);

    return account;
  }

  public async update(payload: {
    accountId: IdType;
    userId: IdType;
    updateAccountDto: UpdateAccountDto;
  }): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail(
      {
        id: payload.accountId,
        memberships: { user: { id: payload.userId } },
      },
      { populate: ['memberships.role'] },
    );
    account.name = payload.updateAccountDto.name;
    await this.em.flush();

    return account;
  }
}
