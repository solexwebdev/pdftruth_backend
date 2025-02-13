import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Point } from '@/domains/points/entities/point.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { EntityManager } from '@mikro-orm/core';
import { PointPricingRule } from '@/domains/points/entities/point-pricing-rule.entity';
import { IdType } from '@/common/types/id.type';
import { Account } from '@/domains/accounts/entities/account.entity';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointRepository: EntityRepository<Point>,
    @InjectRepository(PointPricingRule)
    private readonly pointPricingRuleRepository: EntityRepository<PointPricingRule>,
    private readonly em: EntityManager,
  ) {}

  public async findByAccountId(payload: { accountId: IdType }): Promise<Point> {
    const point = await this.pointRepository.findOne({ account: { id: payload.accountId } });

    if (point) return point;

    const newPoint = new Point({ balance: 0 });
    newPoint.account = { id: payload.accountId } as Account;

    await this.em.persistAndFlush(newPoint);

    return newPoint;
  }

  public async updateBalance(payload: { accountId: IdType; amount: number }): Promise<Point | null> {
    const point = await this.pointRepository.nativeUpdate(
      { account: { id: payload.accountId } },
      { balance: payload.amount },
    );
    return point > 0 ? await this.pointRepository.findOne({ account: { id: payload.accountId } }) : null;
  }

  public async fetchAllPointPricingRules(): Promise<PointPricingRule[]> {
    return await this.pointPricingRuleRepository.findAll();
  }
}
