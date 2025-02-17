import { Module } from '@nestjs/common';
import { PointsService } from '@/domains/points/services/points.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Point } from '@/domains/points/entities/point.entity';
import { PointTransaction } from '@/domains/points/entities/point-transaction.entity';
import { PointPricingRule } from '@/domains/points/entities/point-pricing-rule.entity';
import { PointTransactionService } from '@/domains/points/services/point-transaction.service';
import { AccountCreatedListener } from './listeners/account-created.listner';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Point, PointTransaction, PointPricingRule] })],
  providers: [PointsService, PointTransactionService, AccountCreatedListener],
  exports: [PointsService],
})
export class PointsModule {}
