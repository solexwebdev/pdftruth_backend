import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { IdType } from '@/common/types/id.type';
import { Account } from '@/domains/accounts/entities/account.entity';
import { PointTransaction } from '@/domains/points/entities/point-transaction.entity';
import { ICreatePointTransaction } from '@/domains/points/interfaces/create-point-transaction.interface';

@Injectable()
export class SomeService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: EntityRepository<PointTransaction>,
    private readonly em: EntityManager,
  ) {}

  /**
   * Fetches all point transactions for a given account.
   * @param accountId ID of the account
   * @returns An array of point transactions
   */
  public async findByAccountId(accountId: IdType): Promise<PointTransaction[]> {
    return await this.pointTransactionRepository.find({ account: { id: accountId } });
  }

  public async findOne(id: IdType): Promise<PointTransaction | null> {
    return await this.pointTransactionRepository.findOne(id);
  }

  public async create(payload: { accountId: IdType; data: ICreatePointTransaction }): Promise<PointTransaction> {
    const newEntity = new PointTransaction({ ...payload.data });
    newEntity.account = { id: payload.accountId } as Account;

    await this.em.persistAndFlush(newEntity);

    return newEntity;
  }

  public async update(id: IdType, data: Partial<PointTransaction>): Promise<PointTransaction | null> {
    const entity = await this.pointTransactionRepository.findOne(id);
    if (!entity) return null;
    Object.assign(entity, data);
    await this.em.persistAndFlush(entity);

    return entity;
  }

  public async delete(id: IdType): Promise<boolean> {
    const entity = await this.pointTransactionRepository.findOne(id);
    if (!entity) return false;
    await this.em.removeAndFlush(entity);

    return true;
  }
}
