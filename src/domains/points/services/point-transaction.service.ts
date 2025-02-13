import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { PointTransaction } from '../entities/point-transaction.entity';
import { IdType } from '@/common/types/id.type';

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
  public async findAll(accountId: IdType): Promise<PointTransaction[]> {
    return await this.pointTransactionRepository.find({ account: { id: accountId } });
  }

  public async findOne(id: IdType): Promise<PointTransaction | null> {
    return await this.pointTransactionRepository.findOne(id);
  }

  public async create(data: Partial<PointTransaction>): Promise<PointTransaction> {
    const newEntity = new PointTransaction(data);
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
