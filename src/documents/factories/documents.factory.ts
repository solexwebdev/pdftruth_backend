import { BaseResponseFactory } from '@/common/factories/base-response.factory';
import { Document } from '@/documents/entities/document.entity';
import { DocumentsResponse } from '@/documents/responses/documents.response';
import { DocumentFactory } from '@/documents/factories/document.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsFactory extends BaseResponseFactory<Document[], DocumentsResponse> {
  constructor(private readonly documentFactory: DocumentFactory) {
    super();
  }

  public async createResponse(entity: Document[], options: Record<string, undefined>): Promise<DocumentsResponse> {
    return new DocumentsResponse({
      data: await Promise.all(
        entity.map((el: Document) => {
          return this.documentFactory.createResponse(el);
        }),
      ),
      meta: options.meta,
    });
  }
}
