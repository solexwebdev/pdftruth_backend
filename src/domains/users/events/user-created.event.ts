import { IdType } from '@/common/types/id.type';

export class UserCreatedEvent {
  constructor(
    public readonly userId: IdType,
    public readonly nickname: string,
  ) {}
}
