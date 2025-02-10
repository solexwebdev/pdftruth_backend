import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Collection, Entity, ManyToMany, OneToMany, Opt, Property } from '@mikro-orm/core';
import { Membership } from '@/domains/users/entities/membership.entity';
import { ICreateAccount } from '@/domains/accounts/interfaces/create-account.interface';
import { Document } from '@/domains/documents/entities/document.entity';
import { Tag } from '@/domains/tags/entity/tag.entity';

@Entity({ tableName: 'accounts' })
export class Account extends CustomBaseEntity {
  @Property({ type: String, nullable: this })
  name?: string & Opt;

  @OneToMany(() => Membership, (membership) => membership.account)
  memberships?: Membership[];

  @OneToMany(() => Document, (document) => document.account)
  documents: Document[];

  @ManyToMany(() => Tag, (tag) => tag.accounts)
  tags = new Collection<Tag>(this);

  constructor(data: ICreateAccount) {
    super();
    Object.assign(this, data);
  }
}
