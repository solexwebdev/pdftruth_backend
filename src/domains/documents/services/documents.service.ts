import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Document } from '@/domains/documents/entities/document.entity';
import { StorageService } from '@/domains/storage/services/storage.service';
import { IdType } from '@/common/types/id.type';
import { BucketStoragePathEnum } from '@/domains/storage/enums/bucket-storage-path.enum';
import { DocumentsQueryDto } from '@/domains/documents/dto/documents-query.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DocumentCreatedEvent } from '@/domains/documents/events/document-created.event';
import { DocumentEvent } from '@/domains/documents/enums/document-event.enum';
import { TagsService } from '@/domains/tags/services/tags.service';
import { getEnumKeyByValue } from '@/common/utils/get-enum-key-by-value.util';
import { SortDocuments } from '@/domains/documents/enums/sort-documents.enum';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: EntityRepository<Document>,
    private readonly em: EntityManager,
    private readonly storageService: StorageService,
    private readonly eventEmitter: EventEmitter2,
    private readonly tagsService: TagsService,
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
    const sortField = payload.query.sortBy
      ? getEnumKeyByValue(SortDocuments, payload.query.sortBy)
      : 'documents.createdAt';

    const qb = this.documentRepository
      .createQueryBuilder('documents')
      .where({ account: { id: payload.accountId } })
      .leftJoinAndSelect('account', 'account')
      .leftJoinAndSelect('file', 'file')
      .leftJoinAndSelect('tags', 'tags')
      .orderBy({
        [sortField]: `${payload.query.order}`,
      })
      .limit(payload.query.take)
      .offset(payload.query.skip);

    if (payload.query?.search?.length) {
      qb.andWhere({
        $or: [
          { 'documents.name': { $ilike: `%${payload.query.search}%` } },
          { 'tags.name': { $ilike: `%${payload.query.search}%` } },
        ],
      });
    }

    const [entities, count] = await qb.getResultAndCount();

    return [entities, count];
  }

  public async getAccountDocument(payload: { id: IdType; accountId?: IdType }): Promise<Document> {
    return await this.documentRepository.findOneOrFail(
      { id: payload.id, ...(payload.accountId && { account: { id: payload.accountId } }) },
      { populate: ['account', 'file', 'tags', 'enquiries'] },
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

  public async addTags(payload: { documentId: IdType; accountId: IdType; tagIds: IdType[] }): Promise<number> {
    const document = await this.documentRepository.findOneOrFail({
      id: payload.documentId,
      account: { id: payload.accountId },
    });

    const tags = await this.tagsService.findByIds({ accountId: payload.accountId, ids: payload.tagIds });

    if (tags.length) {
      document.tags.set(tags);
      await this.em.flush();
    }

    return tags.length;
  }
}
