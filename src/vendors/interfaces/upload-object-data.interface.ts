import { BucketStoragePathEnum } from '@/storage/enums/bucket-storage-path.enum';

export interface IUploadObjectData {
  fileBuffer: Buffer;
  fileName: string;
  storagePath: BucketStoragePathEnum;
  mimeType?: string;
}
