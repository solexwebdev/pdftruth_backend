import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, OneToMany, Opt, Property } from '@mikro-orm/core';
import { Membership } from '@/users/entities/membership.entity';

@Entity({ tableName: 'accounts' })
export class Account extends CustomBaseEntity {
  @Property({ type: String, nullable: this })
  name?: string & Opt;

  @OneToMany(() => Membership, (membership) => membership.account)
  memberships?: Membership[];
}
