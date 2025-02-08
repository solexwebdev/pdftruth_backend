import { Injectable } from '@nestjs/common';
import { DocumentCreatedEvent } from '@/documents/events/document-created.event';
import { OnEvent } from '@nestjs/event-emitter';
import { DocumentEvent } from '@/documents/enums/document-event.enum';
import { EnquiryHashHandler } from '@/enquiries/handlers/enquiry-hash.handler';
import { EnquiryMetadataHandler } from '@/enquiries/handlers/enquiry-metadata.handler';
import { EnquiryValidPdfaHandler } from '@/enquiries/handlers/enquiry-valid-pdfa.handler';
import { ICORHandler } from '@/enquiries/interfaces/COR-handler.interface';
import { DocumentsService } from '@/documents/services/documents.service';
import { S3ClientService } from '@/vendors/services/s3-client.service';
import { streamToBuffer } from '@/common/utils/stream-to-buffer.util';

@Injectable()
export class DocumentCreatedListener {
  constructor(
    private readonly enquiryHashHandler: EnquiryHashHandler,
    private readonly enquiryMetadataHandler: EnquiryMetadataHandler,
    private readonly enquirySignatureHandler: EnquiryValidPdfaHandler,
    private readonly documentsService: DocumentsService,
    private readonly s3ClientService: S3ClientService,
  ) {}

  @OnEvent(DocumentEvent.Create)
  public async execute(payload: DocumentCreatedEvent) {
    if (!payload['documentId']) return;

    const document = await this.documentsService.getAccountDocument({ id: payload['documentId'] });

    if (!document.file?.id) return;

    const fileStream = await this.s3ClientService.getFileStream(
      document.file.storagePath + document.file.storedFileName,
    );
    const fileBuffer = await streamToBuffer(fileStream);

    const handler = this.initChainHandlers();

    handler.handle({ documentId: payload['documentId'], fileBuffer });
  }

  private initChainHandlers(): ICORHandler {
    this.enquiryHashHandler.setNext(this.enquiryMetadataHandler).setNext(this.enquirySignatureHandler);

    return this.enquiryHashHandler;
  }
}
