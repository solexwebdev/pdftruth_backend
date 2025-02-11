import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { DocumentResponse } from '@/domains/documents/responses/document.response';
import { Document } from '@/domains/documents/entities/document.entity';
import { Injectable } from '@nestjs/common';
import { StorageService } from '@/domains/storage/services/storage.service';
import { TagFactory } from '@/domains/tags/factories/tag.factory';
import { EnquiryFactory } from '@/domains/enquiries/factories/enquiry.factory';

@Injectable()
export class DocumentFactory extends BaseResponseFactory<Document, DocumentResponse> {
  constructor(
    private readonly storageService: StorageService,
    private readonly tagFactory: TagFactory,
    private readonly enquiryFactory: EnquiryFactory,
  ) {
    super();
  }

  public async createResponse(entity: Document, options?: Record<string, undefined>): Promise<DocumentResponse> {
    const url = entity?.file ? await this.storageService.getStorageItemUrl(entity?.file) : null;
    return new DocumentResponse({
      id: entity.id,
      name: entity.name,
      size: entity.file?.size || 0,
      url,
      createdAt: entity.createdAt,
      ...(entity.tags.isInitialized(true) &&
        !entity.tags?.isEmpty() && { tags: entity.tags?.getItems().map((el) => this.tagFactory.createResponse(el)) }),
      ...(entity.enquiries?.isInitialized(true) &&
        !entity.enquiries?.isEmpty() && {
          enquiries: entity.enquiries?.map((el) => this.enquiryFactory.createResponse(el)),
        }),
      ...(options && { ...options }),
    });
  }
}
