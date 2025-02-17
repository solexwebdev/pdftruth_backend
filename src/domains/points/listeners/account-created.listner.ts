import { AccountCreatedEvent } from '@/domains/users/events/account-created.event';
import { Injectable } from '@nestjs/common';
import { PointsService } from '@/domains/points/services/points.service';
import { PointTransactionService } from '@/domains/points/services/point-transaction.service';
import { AccountEvent } from '@/domains/users/enums/account-event.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { TransactionType } from '../enums/transaction-type.enum';
import { TransectionDescription } from '../enums/transaction-description.enum';

@Injectable()
export class AccountCreatedListener {
  constructor(
    private readonly pointsService: PointsService,
    private readonly pointTransactionService: PointTransactionService,
    private readonly configService: ConfigService,
  ) {}

  @OnEvent(AccountEvent.Create)
  public async handleUserRegisteredEvent(event: AccountCreatedEvent) {
    const hasInvitationBonus = await this.pointTransactionService.hasInvitationBonus(event.accountId);

    if (hasInvitationBonus) return;

    const bonus = this.configService.get<number>(ConfigEnv.INVITATION_BONUS_POINT_AMOUNT) || 0;

    const point = await this.pointsService.findByAccountId({ accountId: event.accountId });

    await this.pointsService.updateBalance({ pointId: point.id, amount: bonus });

    await this.pointTransactionService.create({
      accountId: event.accountId,
      data: {
        transactionType: TransactionType.BONUS,
        amount: bonus,
        description: TransectionDescription.BONUS,
      },
    });
  }
}
