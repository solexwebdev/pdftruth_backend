import { StorageItem } from '@/storage/entities/storage-item.entity';
import { BucketStoragePathEnum } from '@/storage/enums/bucket-storage-path.enum';

export interface IUploadStorageItem extends Partial<StorageItem> {
  fileBuffer: Buffer;
  storedFileName: string;
  originalFileName: string;
  storagePath: BucketStoragePathEnum;
  size: number;
  mimeType: string;
}
