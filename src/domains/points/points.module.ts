import { DocumentsModule } from '@/domains/documents/documents.module';
import { Module } from '@nestjs/common';
import { PointsService } from '@/domains/points/services/points.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Point } from '@/domains/points/entities/point.entity';
import { PointTransaction } from '@/domains/points/entities/point-transaction.entity';
import { PointPricingRule } from '@/domains/points/entities/point-pricing-rule.entity';
import { PointTransactionService } from '@/domains/points/services/point-transaction.service';
import { AccountCreatedListener } from './listeners/account-created.listner';
import { CheckPointGuard } from './guards/check-point.guard';
import { DocumentCreatedListener } from './listeners/document-created.listner';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Point, PointTransaction, PointPricingRule] }), DocumentsModule],
  providers: [PointsService, PointTransactionService, AccountCreatedListener, CheckPointGuard, DocumentCreatedListener],
  exports: [],
})
export class PointsModule {}
