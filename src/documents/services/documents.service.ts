import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/core';
import { Document } from '@/documents/entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: EntityRepository<Document>,
    private readonly em: EntityManager,
  ) {}

  public async create(): Promise<any> {}
}
