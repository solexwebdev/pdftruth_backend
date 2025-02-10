import { Collection, Entity, Index, ManyToMany, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Account } from '@/domains/accounts/entities/account.entity';
import { Document } from '@/domains/documents/entities/document.entity';

@Entity({ tableName: 'tags' })
@Index({ properties: ['name'] })
export class Tag extends CustomBaseEntity {
  @Property({ type: String, nullable: false })
  name!: string;

  @ManyToMany(() => Account, (account: Account) => account.tags, { owner: true })
  accounts = new Collection<Account>(this);

  @ManyToMany(() => Document, (document: Document) => document.tags, { owner: true })
  documents = new Collection<Document>(this);

  constructor(data: { name: string }) {
    super();
    Object.assign(this, data);
  }
}
