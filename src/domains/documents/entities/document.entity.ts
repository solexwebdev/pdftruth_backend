import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, Property } from '@mikro-orm/core';
import { StorageItem } from '@/domains/storage/entities/storage-item.entity';
import { Account } from '@/domains/accounts/entities/account.entity';
import { ICreateDocument } from '@/domains/documents/interfaces/create-document.interface';
import { Enquiry } from '@/domains/enquiries/entities/enquiry.entity';
import { Tag } from '@/domains/tags/entity/tag.entity';

@Entity({ tableName: 'documents' })
export class Document extends CustomBaseEntity {
  @Property({ type: String, default: 'document' })
  name!: string;

  @ManyToOne(() => Account, { nullable: false, deleteRule: 'cascade' })
  account!: Account;

  @OneToOne({ nullable: true, deleteRule: 'set null' })
  file?: StorageItem | null;

  @OneToMany(() => Enquiry, (enquiry) => enquiry.document)
  enquiries?: Enquiry[];

  @ManyToMany(() => Tag, (tag) => tag.documents)
  tags = new Collection<Tag>(this);

  constructor(data: ICreateDocument) {
    super();
    Object.assign(this, data);
  }
}
