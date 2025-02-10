import { StorageItem } from '@/domains/storage/entities/storage-item.entity';
import { BucketStoragePathEnum } from '@/domains/storage/enums/bucket-storage-path.enum';

export interface IUploadStorageItem extends Partial<StorageItem> {
  fileBuffer: Buffer;
  storedFileName: string;
  originalFileName: string;
  storagePath: BucketStoragePathEnum;
  size: number;
  mimeType: string;
}
