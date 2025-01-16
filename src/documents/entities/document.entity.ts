import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { StorageItem } from '@/storage/entities/storage-item.entity';
import { Account } from '@/accounts/entities/account.entity';

@Entity({ tableName: 'documents' })
export class Document extends CustomBaseEntity {
  @Property({ type: String, default: 'document' })
  name!: string;

  @ManyToOne(() => Account, { nullable: false, deleteRule: 'cascade' })
  account: Account;

  @OneToOne()
  file!: StorageItem;
}
