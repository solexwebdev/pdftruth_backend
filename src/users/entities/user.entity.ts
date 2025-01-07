import { Entity, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';

@Entity()
export class User extends CustomBaseEntity {
  @Property({ unique: true, nullable: false })
  email: string;

  @Property()
  password: string;
}
