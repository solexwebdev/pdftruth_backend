import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { RolesSeeder } from '@/db/seeders/roles.seeder';
import { PointPricingRules } from '@/db/seeders/point-pricing-rules.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [RolesSeeder, PointPricingRules]);
  }
}
