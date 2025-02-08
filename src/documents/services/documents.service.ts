import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Document } from '@/documents/entities/document.entity';
import { StorageService } from '@/storage/services/storage.service';
import { IdType } from '@/common/types/id.type';
import { BucketStoragePathEnum } from '@/storage/enums/bucket-storage-path.enum';
import { DocumentsQueryDto } from '@/documents/dto/documents-query.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DocumentCreatedEvent } from '@/documents/events/document-created.event';
import { DocumentEvent } from '@/documents/enums/document-event.enum';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: EntityRepository<Document>,
    private readonly em: EntityManager,
    private readonly storageService: StorageService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async create(payload: { accountId: IdType; file: Express.Multer.File; userId?: IdType }): Promise<Document> {
    const document = new Document({ name: payload.file.originalname, account: { id: payload.accountId } });

    const storageItem = await this.storageService.upload({
      fileBuffer: payload.file.buffer,
      storedFileName: `${Date.now()}_${payload.accountId}.${payload.file.mimetype?.split('/')[1]}`,
      originalFileName: payload.file.originalname,
      storagePath: BucketStoragePathEnum.Documents,
      size: payload.file.size,
      mimeType: payload.file.mimetype,
    });

    document.file = storageItem;

    await this.em.persistAndFlush(document);

    const event = new DocumentCreatedEvent(document.id);
    this.eventEmitter.emit(DocumentEvent.Create, event);

    return document;
  }

  public async fetchByAccountId(payload: {
    accountId: IdType;
    query: DocumentsQueryDto;
  }): Promise<[Document[], number]> {
    const qb = this.documentRepository
      .createQueryBuilder()
      .where({ account: { id: payload.accountId } })
      .leftJoinAndSelect('account', 'account')
      .leftJoinAndSelect('file', 'file')
      .orderBy({ createdAt: payload.query.order })
      .limit(payload.query.take)
      .offset(payload.query.skip);

    if (payload.query?.search?.length) {
      qb.andWhere({ name: { $ilike: `%${payload.query.search}%` } });
    }

    const [entities, count] = await qb.getResultAndCount();

    return [entities, count];
  }

  public async getAccountDocument(payload: { id: IdType; accountId?: IdType }): Promise<Document> {
    return await this.documentRepository.findOneOrFail(
      { id: payload.id, ...(payload.accountId && { account: { id: payload.accountId } }) },
      { populate: ['account', 'file'] },
    );
  }

  public async delete(payload: { accountId: IdType; ids: IdType[] }): Promise<number> {
    const documents = await this.documentRepository.find({
      id: { $in: payload.ids },
      account: { id: payload.accountId },
    });

    if (!documents.length) return 0;

    const storageItemIds = documents.map((document) => document.file?.id).filter((id) => id != null);

    if (storageItemIds.length) await this.storageService.bulkDelete(storageItemIds);

    return await this.documentRepository.nativeDelete({ id: { $in: documents.map((document) => document.id) } });
  }
}
