import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { Account } from '@/domains/accounts/entities/account.entity';

@Entity({ tableName: 'points' })
export class Point extends CustomBaseEntity {
  @Property({ type: 'integer', default: 0, nullable: false })
  balance!: number;

  @OneToOne({ nullable: false, deleteRule: 'cascade', owner: true })
  account!: Account;

  constructor(data: { balance: number }) {
    super();
    Object.assign(this, data);
  }
}
