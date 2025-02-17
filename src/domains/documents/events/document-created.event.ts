import { IdType } from '@/common/types/id.type';

export class DocumentCreatedEvent {
  constructor(public readonly documentId: IdType) {}
}
