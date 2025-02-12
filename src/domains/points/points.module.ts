import { Module } from '@nestjs/common';
import { PointsService } from '@/domains/points/services/points.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Point } from '@/domains/points/entities/point.entity';
import { PointTransaction } from '@/domains/points/entities/point-transaction.entity';
import { PointPricingRule } from '@/domains/points/entities/point-pricing-rule.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Point, PointTransaction, PointPricingRule] })],
  providers: [PointsService],
  exports: [PointsService],
})
export class PointsModule {}
