import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Document } from '@/documents/entities/document.entity';
import { StorageService } from '@/storage/services/storage.service';
import { IdType } from '@/common/types/id.type';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: EntityRepository<Document>,
    private readonly em: EntityManager,
    private readonly storageService: StorageService,
  ) {}

  public async create(payload: { userId: IdType; accountId: IdType; file: Express.Multer.File }): Promise<any> {
    console.log(payload);
  }
}
