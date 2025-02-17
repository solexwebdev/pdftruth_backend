import { IdType } from '@/common/types/id.type';

export class AccountCreatedEvent {
  constructor(public readonly accountId: IdType) {}
}
