import { EntityManager, Dictionary } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { PointPricingRule } from '@/domains/points/entities/point-pricing-rule.entity';
import { PointPricingRulesDefault } from '@/db/seeders/data/point-pricing-rules.default';

export class PointPricingRules extends Seeder {
  async run(em: EntityManager, context?: Dictionary | undefined): Promise<void> {
    const existRules = await em.findAll(PointPricingRule);

    const savingRules: PointPricingRule[] = [];

    for (const data of PointPricingRulesDefault) {
      const existRule = existRules.find(
        (r) => r.maxAmount === data.maxAmount && r.pricePerPoint === data.pricePerPoint,
      );
      if (!existRule) {
        const rule = new PointPricingRule(data);
        savingRules.push(rule);
      }
    }

    if (savingRules.length) await em.persistAndFlush(savingRules);
  }
}
