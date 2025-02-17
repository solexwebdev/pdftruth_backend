import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, Property } from '@mikro-orm/core';

@Entity({ tableName: 'point_pricing_rules' })
export class PointPricingRule extends CustomBaseEntity {
  @Property({ type: 'integer', nullable: false, default: 0 })
  maxAmount!: number;

  @Property({ type: 'integer', nullable: false, default: 0 })
  pricePerPoint!: number;

  constructor(data: { maxAmount: number; pricePerPoint: number }) {
    super();
    Object.assign(this, data);
  }
}
