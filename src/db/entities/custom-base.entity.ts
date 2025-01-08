import { v4 } from 'uuid';
import { Opt, PrimaryKey, Property } from '@mikro-orm/core';
import { IdType } from '@/db/types/id.type';

export abstract class CustomBaseEntity {
  @PrimaryKey()
  id: IdType = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
