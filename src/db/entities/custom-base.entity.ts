import { v4 } from 'uuid';
import { PrimaryKey, Property } from '@mikro-orm/core';
import { IdType } from '@/common/types/id.type';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  id: IdType = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
