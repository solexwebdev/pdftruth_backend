import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Account } from '@/domains/accounts/entities/account.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ICreateAccount } from '@/domains/accounts/interfaces/create-account.interface';
import { IdType } from '@/common/types/id.type';
import { UpdateAccountDto } from '@/domains/accounts/dto/update-account.dto';
import { UsersService } from '@/domains/users/services/users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountCreatedEvent } from '@/domains/users/events/account-created.event';
import { AccountEvent } from '@/domains/users/enums/account-event.enum';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
    private readonly eventEmitter: EventEmitter2,
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
      { populate: ['memberships.role', 'memberships.user'] },
    );

    return account;
  }

  public async getById(accountId: IdType): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail(
      { id: accountId },
      { populate: ['memberships.role', 'memberships.user'] },
    );

    return account;
  }

  public async save(payload: ICreateAccount): Promise<Account> {
    const account = new Account({ ...(payload as ICreateAccount) });
    await this.em.persistAndFlush(account);

    const event = new AccountCreatedEvent(account.id);
    this.eventEmitter.emit(AccountEvent.Create, event);

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
      { populate: ['memberships.role', 'memberships.user'] },
    );

    if (account.memberships?.length) {
      await this.usersService.update(account.memberships[0].user.id, {
        ...payload.updateAccountDto,
      });
    }

    account.name = payload.updateAccountDto.name;
    await this.em.flush();

    return account;
  }
}
