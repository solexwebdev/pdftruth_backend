import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, Property } from '@mikro-orm/core';
import { IUploadStorageItem } from '@/domains/storage/interfaces/upload-storage-item.interface';

@Entity({ tableName: 'storage-items' })
export class StorageItem extends CustomBaseEntity {
  @Property({ columnType: 'text' })
  storedFileName: string;

  @Property({ columnType: 'text' })
  originalFileName: string;

  @Property({ columnType: 'text' })
  storagePath: string;

  @Property({ columnType: 'integer', default: 0 })
  size: number;

  @Property({ columnType: 'text' })
  mimeType: string;

  constructor(data: IUploadStorageItem) {
    super();
    Object.assign(this, data);
  }
}
