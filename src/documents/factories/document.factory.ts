import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { DocumentResponse } from '@/documents/responses/document.response';
import { Document } from '@/documents/entities/document.entity';
import { Injectable } from '@nestjs/common';
import { StorageService } from '@/storage/services/storage.service';

@Injectable()
export class DocumentFactory extends BaseResponseFactory<Document, DocumentResponse> {
  constructor(private readonly storageService: StorageService) {
    super();
  }

  public async createResponse(entity: Document, options?: Record<string, undefined>): Promise<DocumentResponse> {
    const url = await this.storageService.getStorageItemUrl(entity.file);
    return new DocumentResponse({
      id: entity.id,
      name: entity.name,
      size: entity.file?.size,
      url,
      createdAt: entity.createdAt,
    });
  }
}
