import { PointTransactionService } from '@/domains/points/services/point-transaction.service';
import { DocumentEvent } from '@/domains/documents/enums/document-event.enum';
import { DocumentCreatedEvent } from '@/domains/documents/events/document-created.event';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PointsService } from '@/domains/points/services/points.service';
import { DocumentsService } from '@/domains/documents/services/documents.service';
import { TransactionType } from '@/domains/points/enums/transaction-type.enum';
import { TransectionDescription } from '@/domains/points/enums/transaction-description.enum';

@Injectable()
export class DocumentCreatedListener {
  constructor(
    private readonly pointsService: PointsService,
    private readonly pointTransactionService: PointTransactionService,
    private readonly documentsService: DocumentsService,
  ) {}

  @OnEvent(DocumentEvent.Create)
  public async execute(event: DocumentCreatedEvent) {
    const document = await this.documentsService.getById({ id: event.documentId });

    const point = await this.pointsService.findByAccountId({ accountId: document.account.id });

    await this.pointsService.updateBalance({ pointId: point.id, amount: point.balance - 1 });

    await this.pointTransactionService.create({
      accountId: document.account.id,
      data: {
        transactionType: TransactionType.SPEND,
        amount: -1,
        description: TransectionDescription.SPEND,
      },
    });
  }
}
