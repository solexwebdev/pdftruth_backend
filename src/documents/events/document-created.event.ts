import { IdType } from '@/common/types/id.type';

export class DocumentCreatedEvent {
  constructor(private readonly documentId: IdType) {}
}
